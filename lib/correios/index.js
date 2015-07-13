var request = require('./request')
  , scrap   = require('./scrap')
  
module.exports = function (cep, callback) {

  // Requesting correios web site
  request(cep, function (err, html) {

    if (err) process.nextTick(function () { callback(err) })

    // Scraping the HTML
    else scrap(html, function (err, endereco) {
      if (endereco) endereco.cep = cep
      process.nextTick(function() { callback(err, endereco) })
    })

  })

}

