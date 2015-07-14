var assert    = require('assert')
  , EmptyHtml = require('../../lib/correios/scrap/empty-html')
  , rfile     = require('rfile')
  , scrap     = require('../../lib/correios/scrap')

describe('correios', function () {
  describe('scrap', function () {

    it('should raise an error if the HTML is empty', function (done) {

      // arrange
      var html = ''

      // act
      scrap(html, function (err, endereco) {

        // assert
        assert.deepEqual(err, new EmptyHtml())
        assert.equal(endereco, null)

        done()

      })

    })

    it('should crawl the given sample without errors', function (done) {

      // arrange
      var html = rfile('./without-errors.html')

      // act
      scrap(html, function (err, endereco) {

        // assert
        assert.ifError(err)
        assert(endereco)

        done()

      })

    })

    it('should raise an error if there is no "respostadestaque"', function (done) {

      // arrange
      var html = rfile('./no-respostadestaque.html')

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
      var html = rfile('./no-slash-on-logradouro.html')

      // act
      scrap(html, function (err, endereco) {

        // assert
        assert(err)
        assert(!endereco)

        done()

      })

    })

    it('should raise an error if scraped an invalid UF', function (done) {

      // arrange
      var html = rfile('./an-invalid-uf.html')

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
      var html = rfile('./more-than-one-slash-on-logradouro.html')

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
      var html = rfile('./less-than-expected-respostadestaque.html')

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

