module.exports = function (cep) {
  var data = 'cepEntrada=' + cep + '&metodo=buscarCep'
  return {
      data:    data
    , options: {
        host:    'm.correios.com.br'
      , method:  'POST'
      , path:    '/movel/buscaCepConfirma.do'
      , port:    80
      , headers: {
          'Content-Type':   'application/x-www-form-urlencoded',
          'Content-Length': data.length
        }
      }
  }
}

