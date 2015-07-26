var correios  = require('../correios')
  , responses = require('./responses')

module.exports = function (req, res) {

  correios('30130010', function (err, endereco) {

    // if there's an error crawling Correios' website
    if (responses.internalError(err, res)) ;

    // if not found
    else if (responses.noContent(endereco, res)) ;

    // if crawled
    else res.sendStatus(200)

  })

}

