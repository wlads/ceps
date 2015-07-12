#! /usr/bin/env node

var configuration = require('../lib/configuration')
  , persistence   = require('../lib/persistence')
  , web           = require('../lib/web')

configuration.check()
persistence.connect(web)

