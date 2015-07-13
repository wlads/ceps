var basicAuth     = require('basic-auth')
  , correios      = require('../correios')
  , configuration = require('../configuration')
  , internalError = require('./internal-error')
  , notFound      = require('./not-found')
  , persistence   = require('../persistence')
  , sanitizeCep   = require('sanitize-cep')

module.exports = function (mongo, req, res) {

  // if there's an error with the secret header
  if (badAuth(req, res)) return

  var cep = sanitizeCep(req.params.cep)

  // if the cep is malformed
  if (badCep(cep, res)) return

  // retrieving the given cep from the database
  persistence.retrieve(mongo, cep, function (err, endereco) {

    // if there's an error retrieving
    if (internalError(err, res)) return

    // if there's no address in the database or if it's an old document
    if (!endereco || needsNew(endereco)) {

      // crawl a new one
      correios(cep, function (err, endereco) {

        // if there's an error crawling Correios' website
        if (internalError(err, res)) return

        // if not found
        if (notFound(endereco, res)) return

        // upserts
        persistence.upsert(mongo, endereco, function (err) {

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

function respond (endereco, res) {
  delete endereco._id
  delete endereco.data
  res.json(endereco)
}

// if the document is older than an month it 'needs new'
function needsNew (endereco) {
  var date = new Date()
  date.setMonth(-1)
  return date > endereco.data
}

function badAuth (req, res) {
  var credentials = basicAuth(req)
  if (credentials) {
    var auth = credentials.name + ':' + credentials.pass
    if (auth === configuration.auth()) return false
  }
  res.sendStatus(401)
  return true
}

function badCep (cep, res) {
  if (cep) return false
  else {
    res.sendStatus(400)
    return true
  }
}

