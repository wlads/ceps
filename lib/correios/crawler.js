var cheerio = require ('cheerio')

module.exports = function (html, callback) {
  if (htmlOk(html, callback)) {
    var $         = cheerio.load(html)
      , erros     = $('.erro')
      , respostas = $('.respostadestaque')
    if (dadosNaoEncontrados(erros)) process.nextTick(function () { callback(null, null) })
    else if (respostasLengthOk(respostas, callback) && localidadeOk(respostas, callback)) {
      var endereco = enderecoFromRespostas(respostas)
      process.nextTick(function () { callback(null, endereco) })
    }
  }
}

function dadosNaoEncontrados (erros) {
  if (erros && erros.length) {
    for (var i = 0; i < erros.length; ++i) {
      if (erros.eq(i).text().trim() === 'Dados nao encontrados') return true
    }
  }
  return false
}

function htmlOk (html, callback) {
  if (html) return true
  else {
    process.nextTick(function () { callback('HTML vazio passado.') })
    return false
  }
}

function respostasLengthOk (respostas, callback) {
  if (respostas.length === 4) return true
  else {
    process.nextTick(function() { callback('Quantidade de respostas inesperada: ' + respostas.length + '.') })
    return false
  }
}

function localidadeOk (respostas, callback) {
  if (respostas.eq(2).text().trim().split('/').length === 2) return true
  else {
    process.nextTick(function () { callback('Localidade inesperada: "' + respostas.eq(2).text() + ".") })
    return false
  }
}

function enderecoFromRespostas (respostas) {
  return {
      logradouro: respostas.eq(0).text().trim()
    , bairro:     respostas.eq(1).text().trim()
    , localidade: respostas.eq(2).text().trim().split('/')[0].trim()
    , uf:         respostas.eq(2).text().trim().split('/')[1].trim()
  }
}
