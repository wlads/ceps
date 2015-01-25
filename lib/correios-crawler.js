var crawler = require('./correios/crawler')
  , request = require('./correios/request')
  
module.exports = function (cep, callback) {

  function returnsEndereco (err, endereco) {
    if (endereco) endereco.cep = cep
    process.nextTick(function () { callback(err, endereco)  })
  }

  function crawlsHtml (err, html) {
    if (err) process.nextTick(function () { callback(err) })
    else crawler(html, returnsEndereco)
  }

  request(cep, crawlsHtml)

}

