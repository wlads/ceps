var cep     = require('./cep')
  , express = require('express')
  , github  = require('./github')
  , morgan  = require('morgan')
  , test    = require('./test')
  , version = require('./version')

module.exports = function (mongo) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',        github)
  app.get('/test',    test)
  app.get('/version', version)
  app.get('/:cep',    function (req, res) { cep(mongo, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

