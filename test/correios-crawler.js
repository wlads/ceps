var assert          = require('assert')
  , correiosCrawler = require('../lib/correios-crawler.js')

describe('./lib/correios-crawler.js', function () {
  it('should request and crawl correctly', function (done) {
    correiosCrawler('08527050', function (err, endereco) {
      assert(!err)
      assert.equal(endereco.cep, '08527050')
      assert.equal(endereco.logradouro, 'Rua Mickey')
      assert.equal(endereco.bairro, 'Parque Dourado')
      assert.equal(endereco.localidade, 'Ferraz de Vasconcelos')
      assert.equal(endereco.uf, 'SP')
      done()
    })
  })
})

describe('./lib/correios-crawler.js', function () {
  it('should request and crawl that there\'s nothing', function (done) {
    correiosCrawler('00000000', function (err, endereco) {
      assert(!err)
      assert(!endereco)
      done()
    })
  })
})

