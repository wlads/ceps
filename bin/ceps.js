#! /usr/bin/env node

var persistence = require('../lib/persistence')
  , web         = require('../lib/web')

persistence.connect(function (err, mongo) {
  if (err) throw err
  web(mongo)
})

