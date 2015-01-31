var cheerio = require('cheerio')
  , uf     = require('unidades-federativas')

module.exports = function (html, callback) {
  var err      = null
    , endereco = null

  err = htmlErr(html)
  if (!err) {
    var $         = cheerio.load(html)
      , erros     = $('.erro')
      , respostas = $('.respostadestaque')

    if (!dadosNaoEncontrados(erros)) {
      err = respostasLengthErr(respostas) || localidadeErr(respostas) || null
      if (!err) endereco = getEndereco(respostas) || null
    }
  }
  process.nextTick(function () { callback(err, endereco) })
}

function htmlErr (html) {
  if (!html) return 'HTML vazio passado.'
}

function dadosNaoEncontrados (erros) {
  if (erros && erros.length) {
    for (var i = 0; i < erros.length; ++i) {
      if (erros.eq(i).text().trim() === 'Dados nao encontrados') return true
    }
  }
  return false
}

function respostasLengthErr (respostas) {
  if (respostas.length < 4) return 'Quantidade de respostas inesperada: ' + respostas.length + '.'
}

function localidadeErr (respostas, callback) {
  var localidade   = respostas.eq(2).text()
    , cityAndState = localidade.trim().split('/')
  if (cityAndState.length !== 2 || !uf.validAbbreviation(cityAndState[1])) return 'Localidade inesperada: "' + localidade + '".'
}

function getEndereco (respostas) {
  return {
      logradouro: respostas.eq(0).text().trim()
    , bairro:     respostas.eq(1).text().trim()
    , localidade: respostas.eq(2).text().trim().split('/')[0].trim()
    , uf:         respostas.eq(2).text().trim().split('/')[1].trim()
  }
}

