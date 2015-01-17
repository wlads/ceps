#! /usr/bin/env node

var express         = require('express')
  , mongo           = require('../lib/mongo')
  , morgan          = require('morgan')
  , configuration   = require('../lib/configuration')
  , correiosCrawler = require('../lib/correios-crawler')

// forcing environment variables check on start
configuration.connectionString()
configuration.secret()

mongo.connect(function (err, db) {
  if (err) throw err

  function serveCep (req, res) {
    var cep = req.params.cep

    // retrieving the given cep from the database
    mongo.retrieve(db, cep, function (err, endereco) {

      // if there's an error with the secret header
      if (endedRequestDueAuthorization(req, res)) return

      // if there's an error retrieving
      if (endedRequestDueError(err, res)) return

      // if there's no address in the database or if it's an old document
      if (!endereco || needsNew(endereco)) {

        // crawl a new one
        correiosCrawler(cep, function (err, endereco) {

          // if there's an error crawling Correios' website
          if (endedRequestDueError(err, res)) return

          // upserts
          mongo.upsert(db, endereco, function (err) {

            // if there's an error upserting
            if (endedRequestDueError(err, res)) return

            // finally, after crawled and update in database, responds it
            respond(endereco, res)
          })

        })

      // no need to crawl, responds it
      } else respond(endereco, res)

    })
  }

  var app = express()
  app.use(morgan('short'))
  app.get('/', redirectToGitHub)
  app.get('/:cep', serveCep)
  app.disable('x-powered-by')
  app.listen(process.env.PORT || 80)
})

function redirectToGitHub (req, res) {
  res.redirect('https://github.com/tallesl/ceps')
}

function respond (endereco, res) {
  delete endereco._id
  res.json(endereco)
}

function endedRequestDueAuthorization (req, res) {
  if (!req.headers || !req.headers.Secret) {
    res.sendStatus(400)
    return true
  } else if (req.headers.Secret !== configuration.secret()) {
    res.sendStatus(403)
    return true
  } else return false
}

// something bad happened
function endedRequestDueError (err, res) {
  if (err) {

    // logs the error to stderr
    console.error(err)

    // and responds 500
    res.sendStatus(500)

    return true
  } else return false
}

function needsNew (endereco) {
  var date = mongo.documentDate(endereco)

  // if the document is older than an month it 'needs new'
  date.setMonth(date.getMonth() + 1)

  return date < new Date()
}
