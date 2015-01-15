var assert = require('assert')
  , crawler = require('../../lib/correios/crawler.js')

describe('./lib/correios/crawler', function () {
  it('should raise an error if the HTML is empty', function (done) {

    // arrange
    var html = ''

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should crawl the given sample without errors', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span class="respostadestaque">\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Bairro: </span><span class="respostadestaque">Centro</span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span class="respostadestaque">\
        Belo Horizonte\
        \
		/MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(!err)
      assert(endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should raise an error if there is no "respostadestaque"', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span>\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Bairro: </span><span>Centro</span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span>\
        Belo Horizonte\
        \
		/MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span>30130010</span><br/>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should raise an error if there is no slash on "logradouro"', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span class="respostadestaque">\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Bairro: </span><span class="respostadestaque">Centro</span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span class="respostadestaque">\
        Belo Horizonte\
        \
		MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should raise an error if there is more than one slash on "logradouro"', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span class="respostadestaque">\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Bairro: </span><span class="respostadestaque">Centro</span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span class="respostadestaque">\
        Belo /Horizonte\
        \
		/MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should raise an error if "respostadestaque" is less than the expected', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span class="respostadestaque">\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span class="respostadestaque">\
        Belo Horizonte\
        \
		/MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})

describe('./lib/correios/crawler', function () {
  it('should raise an error if "respostadestaque" is more than the expected', function (done) {

    // arrange
    var html = '\
<div class="caixacampobranco">\
    <span class="resposta">Logradouro: </span>\
    <span class="respostadestaque">\
        Pra�a Sete de Setembro\
        \
    </span><br/>\
    <span class="resposta">Bairro: </span><span class="respostadestaque">Centro</span><br/>\
    <span class="resposta">Localidade / UF: </span>\
    <span class="respostadestaque">\
        Belo Horizonte\
        \
		/MG\
        \
    </span><br/>\
    <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
    <span class="respostadestaque">extra info</span>\
</div>'

    // act
    crawler(html, function (err, endereco) {

      // assert
      assert(err)
      assert(!endereco)
      done()
    })

  })
})