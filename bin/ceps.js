#! /usr/bin/env node

var configuration   = require('../lib/configuration')
  , correiosCrawler = require('../lib/correios-crawler')
  , express         = require('express')
  , mongo           = require('../lib/mongo')
  , morgan          = require('morgan')
  , sanitizeCep     = require('sanitize-cep')

// forcing environment variables check on start
configuration.connectionString()
configuration.secret()

mongo.connect(function (err, db) {
  if (err) throw err

  function serveCep (req, res) {

    // if there's an error with the secret header
    if (badAuth(req, res)) return

    var cep = sanitizeCep(req.params.cep)

    // if the cep is malformed
    if (badCep(cep, res)) return

    // retrieving the given cep from the database
    mongo.retrieve(db, cep, function (err, endereco) {

      // if there's an error retrieving
      if (internalError(err, res)) return

      // if there's no address in the database or if it's an old document
      if (!endereco || needsNew(endereco)) {

        // crawl a new one
        correiosCrawler(cep, function (err, endereco) {

          // if there's an error crawling Correios' website
          if (internalError(err, res)) return

          // if not found
          if (notFound(endereco, res)) return

          // upserts
          mongo.upsert(db, endereco, function (err) {

            // if there's an error upserting
            if (internalError(err, res)) return

            // finally, after crawled and update in database, responds it
            respond(endereco, res)
          })

        })

      // no need to crawl, responds it
      } else respond(endereco, res)

    })
  }

  function testCep (req, res) {
    correiosCrawler('30130010', function (err, endereco) {

      // if there's an error crawling Correios' website
      if (internalError(err, res)) ;

      // if not found
      else if (notFound(endereco, res)) ;

      // if crawled
      else res.sendStatus(200)

    })
  }

  var app = express()
  app.use(morgan('short'))
  app.get('/', redirectToGitHub)
  app.get('/test', testCep)
  app.get('/:cep', serveCep)
  app.disable('x-powered-by')
  app.listen(process.env.PORT || 80)
})

function redirectToGitHub (req, res) {
  res.redirect('https://github.com/tallesl/ceps')
}

function respond (endereco, res) {
  delete endereco._id
  delete endereco.data
  res.json(endereco)
}

function badCep (cep, res) {
  if (cep) return false
  else {
    res.sendStatus(400)
    return true
  }
}

function badAuth (req, res) {
  if (!req.headers || !req.headers.secret) {
    res.sendStatus(400)
    return true
  } else if (req.headers.secret !== configuration.secret()) {
    res.sendStatus(403)
    return true
  } else return false
}

// something bad happened
function internalError (err, res) {
  if (err) {

    // logs the error to stderr
    console.error(err)

    // and responds 500
    res.sendStatus(500)

    return true
  } else return false
}

function notFound (endereco, res) {
  if (endereco) return false
  else {
    res.sendStatus(204)
    return true
  }
}

// if the document is older than an month it 'needs new'
function needsNew (endereco) {
  var date = new Date()
  date.setMonth(-1)
  return date > endereco.data
}

