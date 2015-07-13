var correios      = require('../correios')
  , internalError = require('./internal-error')
  , notFound      = require('./not-found')

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
    if (internalError(err, res)) ;

    // if not found
    else if (notFound(endereco, res)) ;

    // if crawled
    else res.sendStatus(200)

  })

}

