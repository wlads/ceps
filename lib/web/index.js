var cep     = require('./cep')
  , express = require('express')
  , morgan  = require('morgan')
  , status  = require('./status')

module.exports = function (mongo) {

  var app = express()

  app.use(morgan('short'))

  app.get('/', status)
  app.get('/:cep', function (req, res) { cep(mongo, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

