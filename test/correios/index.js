var assert   = require('assert')
  , correios = require('../../lib/correios')

describe('correios', function () {
  describe('index', function () {

    it('should request and crawl correctly', function (done) {
      correios('08527050', function (err, endereco) {

        assert.ifError(err)
        assert.equal(endereco.cep,        '08527050')
        assert.equal(endereco.logradouro, 'Rua Mickey')
        assert.equal(endereco.bairro,     'Parque Dourado')
        assert.equal(endereco.localidade, 'Ferraz de Vasconcelos')
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

