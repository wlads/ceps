var address       = require('../address')
  , basicAuth     = require('basic-auth')
  , correios      = require('../correios')
  , persistence   = require('../persistence')
  , responses     = require('./responses')
  , sanitizeCep   = require('sanitize-cep')

module.exports = function (mongo, req, res) {

  // if there's an error with the authorization header
  if (responses.unauthorized(req, res)) return

  var cep = sanitizeCep(req.params.cep)

  // if the cep is malformed
  if (responses.badRequest(cep, res)) return

  // if we have persistence
  if (mongo) {
  
    // retrieving the given cep from the database
    persistence.retrieve(mongo, cep, function (err, endereco) {

      // if there's an error retrieving
      if (responses.internalError(err, res)) return

      // if there's no address in the database or if it's an old document
      if (!endereco || address.needsNew(endereco)) {

        // crawl a new one
        correios(cep, function (err, endereco) {

          // if there's an error crawling Correios' website
          if (responses.internalError(err, res)) return

          // if not found
          if (responses.noContent(endereco, res)) return

          // upserts
          persistence.upsert(mongo, endereco, function (err) {

            // if there's an error upserting
            if (responses.internalError(err, res)) return

            // finally, after crawled and update in database, responds it
            responses.ok(endereco, res)
          })

        })

      // no need to crawl, responds it
      } else responses.ok(endereco, res)

    })

  }

}

