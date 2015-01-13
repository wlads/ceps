var cheerio = require ('cheerio')

module.exports = function (html, callback) {
  if (htmlOk(html, callback)) {
    var respostas = respostasFromHtml(html)
    if (respostasLengthOk(respostas, callback) && localidadeOk(respostas, callback)) {
      var endereco = enderecoFromRespostas(respostas)
      process.nextTick(function () { callback(null, endereco) })
    }
  }
}

function htmlOk(html, callback) {
  if (html) return true
  else {
    process.nextTick(function () { callback('HTML vazio passado.') })
    return false
  }
}

function respostasFromHtml(html) {
  return cheerio.load(html)('.respostadestaque')
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
