#! /usr/bin/env node

var config      = require('../lib/config')
  , persistence = require('../lib/persistence')
  , web         = require('../lib/web')

// if there's a connection string set
if (config.cs) {

  // connect to mongo
  persistence.connect(config.cs, function (err, mongo) {

    // and then starts the webserver
    if (err) throw err
    web(mongo)

  })

// else we just started the web server without persistence
} else web()

