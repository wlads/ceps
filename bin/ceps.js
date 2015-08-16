#! /usr/bin/env node

var config      = require('../lib/config')
  , persistence = require('../lib/persistence')
  , web         = require('../lib/web')

// if there's a connection string set
if (config.mongo) {

  // connect to mongo
  persistence.connect(config.mongo, function (err, mongo) {

    // and then starts the webserver
    if (err) throw err
    web(mongo)

  })

// else we just started the web server without persistence
} else web()

