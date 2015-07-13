var assert  = require('assert')
  , scrap = require('../../lib/correios/scrap.js')

describe('correios', function () {
  describe('scrap', function () {

    it('should raise an error if the HTML is empty', function (done) {

      // arrange
      var html = ''

      // act
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

    it('should crawl the given sample without errors', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span class="respostadestaque">\
          Praça Sete de Setembro\
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
      scrap(html, function (err, endereco) {

        // assert
        assert(!err)
        assert(endereco)
        done()
      })

    })

    it('should raise an error if there is no "respostadestaque"', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span>\
          Praça Sete de Setembro\
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
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

    it('should raise an error if there is no slash on "logradouro"', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span class="respostadestaque">\
          Praça Sete de Setembro\
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
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

    it('should raise an error if the UF crawled is invalid', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span class="respostadestaque">\
          Praça Sete de Setembro\
          \
      </span><br/>\
      <span class="resposta">Bairro: </span><span class="respostadestaque">Centro</span><br/>\
      <span class="resposta">Localidade / UF: </span>\
      <span class="respostadestaque">\
          Belo Horizonte\
          \
      /XX\
          \
      </span><br/>\
      <span class="resposta">CEP: </span><span class="respostadestaque">30130010</span><br/>\
  </div>'

      // act
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

    it('should raise an error if there is more than one slash on "logradouro"', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span class="respostadestaque">\
          Praça Sete de Setembro\
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
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

    it('should raise an error if "respostadestaque" is less than the expected', function (done) {

      // arrange
      var html = '\
  <div class="caixacampobranco">\
      <span class="resposta">Logradouro: </span>\
      <span class="respostadestaque">\
          Praça Sete de Setembro\
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
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)
        done()
      })

    })

  })
})

