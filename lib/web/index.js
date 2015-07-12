var express          = require('express')
  , morgan           = require('morgan')
  , redirectToGitHub = require('./redirect-to-github')
  , serveCep         = require('./serve-cep')
  , testCep          = require('./test-cep')

module.exports = function (mongo) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',     redirectToGitHub)
  app.get('/test', testCep)
  app.get('/:cep', function (req, res) { serveCep(mongo, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

