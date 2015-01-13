var crawler = require('./correios/crawler')
  , request = require('./correios/request')
  
module.exports = function (cep, callback) {
  request(cep, function (err, html) {
    process.nextTick(function () {
      if (err) callback(err)
      else crawler(html, callback)
    })
  })
}
