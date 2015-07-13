var basicAuth     = require('basic-auth')
  , correios      = require('../../correios')
  , persistence   = require('../../persistence')
  , responses     = require('../responses')
  , sanitizeCep   = require('sanitize-cep')

module.exports = function (mongo, req, res) {

  // if there's an error with the secret header
  if (responses.badAuth(req, res)) return

  var cep = sanitizeCep(req.params.cep)

  // if the cep is malformed
  if (responses.badCep(cep, res)) return

  // retrieving the given cep from the database
  persistence.retrieve(mongo, cep, function (err, endereco) {

    // if there's an error retrieving
    if (responses.internalError(err, res)) return

    // if there's no address in the database or if it's an old document
    if (!endereco || needsNew(endereco)) {

      // crawl a new one
      correios(cep, function (err, endereco) {

        // if there's an error crawling Correios' website
        if (responses.internalError(err, res)) return

        // if not found
        if (responses.notFound(endereco, res)) return

        // upserts
        persistence.upsert(mongo, endereco, function (err) {

          // if there's an error upserting
          if (responses.internalError(err, res)) return

          // finally, after crawled and update in database, responds it
          responses.endereco(endereco, res)
        })

      })

    // no need to crawl, responds it
    } else responses.endereco(endereco, res)

  })
}

// if the document is older than an month it 'needs new'
function needsNew (endereco) {
  var date = new Date()
  date.setMonth(-1)
  return date > endereco.data
}

