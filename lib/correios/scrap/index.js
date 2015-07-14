var cheerio                = require('cheerio')
  , EmptyHtml              = require('./empty-html')
  , uf                     = require('unidades-federativas')
  , UnexpectedAnswerAmount = require('./unexpected-answer-amount')
  , UnexpectedLocation     = require('./unexpected-location')

module.exports = function (html, callback) {

  var err     = null
    , address = null

  if (html) {

    var $       = cheerio.load(html)
      , errors  = $('.erro')
      , answers = $('.respostadestaque')

    if (foundAnything(errors)) {

      if (answers.length < 4) err = new UnexpectedAnswerAmount(answers.length)
      else {

        var location = answers.eq(2).text()
        if (unexpectedLocation(location)) err = new UnexpectedLocation(location)
        else address = getAddress(answers)

      }

    }

  } else err = new EmptyHtml()

  process.nextTick(function () { callback(err, address) })

}

function foundAnything (errors) {
  if (errors && errors.length) {
    for (var i = 0; i < errors.length; ++i) {
      if (errors.eq(i).text().trim() === 'Dados nao encontrados') return false
    }
  } else return true
}

function unexpectedLocation (location) {
  var cityState = location.trim().split('/')
  return cityState.length !== 2 || !uf.validAbbreviation(cityState[1])
}

function getAddress (answers) {
  return {
      logradouro: answers.eq(0).text().trim()
    , bairro:     answers.eq(1).text().trim()
    , localidade: answers.eq(2).text().trim().split('/')[0].trim()
    , uf:         answers.eq(2).text().trim().split('/')[1].trim()
  }
}

