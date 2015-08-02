var config   = require('../../config')
  , correios = require('../../correios')
  , format   = require('format-unicorn/safe')
  , rfile    = require('rfile')
  , version  = require('../../../package').version

var html = rfile('./index.html')

module.exports = function (req, res) {

  correios('30130010', function (err) {

    var status = format(html, {
        authentication: config.auth ? '✅' : '❌'
      , persistence:    config.cs   ? '✅' : '❌'
      , scraping:       !err        ? '✅' : '❌'
      , version:        version
    })

    res.set('Content-Type', 'text/html')
    res.send(status)

  })

}

