var http = require('http')

module.exports = function (cep, callback) {
  var data     = 'cepEntrada=' + cep + '&metodo=buscarCep'
    , options  = requestOptions(data.length)
    , response = function (res) {
        if (res.statusCode !== 200) {
          process.nextTick(function () {
            callback('Correios server returned ' + res.status + '.')
          })
        }

        res.setEncoding('utf8')

        var html = ''
        res.on('data', function (chunk) {
          html += chunk
        })

        res.on('end', function () {
          process.nextTick(function () { callback(null, html) })
        })
      }

  var post = http.request(options, response)
  post.write(data)
  post.end()
}

function requestOptions (contentLength) {
  return {
    host:    'm.correios.com.br'
  , method:  'POST'
  , path:    '/movel/buscaCepConfirma.do'
  , port:    80
  , headers: {
      'Content-Type':   'application/x-www-form-urlencoded',
      'Content-Length': contentLength
    }
  }
}

