var BadAnswer  = require('./bad-answer')
  , http       = require('http')
  , iconv      = require('iconv-lite')
  , setup      = require('./setup')
  , fromFamily = require('from-family')

module.exports = function (cep, callback) {
  var content = setup(cep)

  var response = function (res) {

    if (fromFamily.success(res)) {

      var chunks = [ ]

      res.on('data', function (chunk) { chunks.push(chunk) })
      res.on('end',  function () {
        var html = iconv.decode(Buffer.concat(chunks), 'iso-8859-1')
        process.nextTick(function () { callback(null, html) })
      })

    } else process.nextTick(function () { callback(new BadAnswer(res.statusCode)) })

  }

  var post = http.request(content.options, response)
  post.write(content.data)
  post.end()
}

