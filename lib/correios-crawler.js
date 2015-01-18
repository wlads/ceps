var crawler = require('./correios/crawler')
  , request = require('./correios/request')
  
module.exports = function (cep, callback) {
  request(cep, function (err, html) {
    process.nextTick(function () {
      if (err) callback(err)
      else crawler(html, function (err, endereco) {
        process.nextTick(function () {
          if (err) callback(err)
          else {
            if (endereco) endereco.cep = cep
            callback(null, endereco)
          }
        })
      })
    })
  })
}
