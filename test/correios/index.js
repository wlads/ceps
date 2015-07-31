var assert   = require('assert')
  , correios = require('../../lib/correios')

describe('correios', function () {
  describe('index', function () {

    it('should request and crawl correctly', function (done) {
      correios('01001001', function (err, endereco) {

        assert.ifError(err)
        assert.equal(endereco.cep,        '01001001')
        assert.equal(endereco.logradouro, 'Praça da Sé - lado par')
        assert.equal(endereco.bairro,     'Sé')
        assert.equal(endereco.localidade, 'São Paulo')
        assert.equal(endereco.uf,         'SP')

        done()

      })
    })

    it('should request and crawl that there\'s nothing', function (done) {
      correios('00000000', function (err, endereco) {

        assert.ifError(err)
        assert.equal(endereco, null)

        done()

      })
    })

  })
})

