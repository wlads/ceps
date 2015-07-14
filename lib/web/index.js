var express = require('express')
  , morgan  = require('morgan')
  , routes  = require('./routes')

module.exports = function (mongo) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',        routes.root)
  app.get('/:cep',    function (req, res) { routes.cep(mongo, req, res) })
  app.get('/test',    routes.test)
  app.get('/version', routes.version)

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

