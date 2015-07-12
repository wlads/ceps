var internalError = require('./internal-error')
  , notFound      = require('./not-found')

module.exports = function (req, res) {
  correiosCrawler('30130010', function (err, endereco) {

    // if there's an error crawling Correios' website
    if (internalError(err, res)) ;

    // if not found
    else if (notFound(endereco, res)) ;

    // if crawled
    else res.sendStatus(200)

  })
}

