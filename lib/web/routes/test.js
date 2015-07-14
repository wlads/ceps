var correios  = require('../../correios')
  , envvar    = require('envvar')
  , responses = require('../responses')

module.exports = function (req, res) {
  testConfiguration()
  testScraping(res)
}

function testConfiguration () {
  envvar.string('CEPS_CONNECTIONSTRING')
  envvar.string('CEPS_AUTH')
}

function testScraping (res) {
  correios('30130010', function (err, endereco) {

    // if there's an error crawling Correios' website
    if (responses.internalError(err, res)) ;

    // if not found
    else if (responses.notFound(endereco, res)) ;

    // if crawled
    else res.sendStatus(200)

  })

}

