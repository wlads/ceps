var BadAnswer  = require('./bad-answer')
  , http       = require('http')
  , setup      = require('./setup')
  , fromFamily = require('from-family')

module.exports = function (cep, callback) {
  var content = setup(cep)

  var response = function (res) {

    if (fromFamily.success(res)) {

      var html = ''

      res.setEncoding('utf8')
      res.on('data', function (chunk) { html += chunk })
      res.on('end',  function () { process.nextTick(function () { callback(null, html) }) })

    } else process.nextTick(function () { callback(new BadAnswer(res.statusCode)) })

  }

  var post = http.request(content.options, response)
  post.write(content.data)
  post.end()
}

