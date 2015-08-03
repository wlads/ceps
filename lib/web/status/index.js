var config      = require('../../config')
  , correios    = require('../../correios')
  , format      = require('format-unicorn/safe')
  , package     = require('../../../package')
  , persistence = require('../../persistence')
  , rfile       = require('rfile')
  , util        = require('util')

var html  = rfile('./index.html')
  , ok    = color('set, ok', 'green')
  , nok   = color('set, not ok', 'red')
  , unset = color('not set', 'orange')


module.exports = function (mongo, req, res) {
  
  var status = {
      error:   false
    , version: package.version
  }
  
  testAuthentication(status, function() {
    testPersistence(mongo, status, function () {
      testCorreios(status, function () {
    
        res.set('Content-Type', 'text/html')
        res.status(status.error ? 500 : 200).send(format(html, status))
    
      })
    })
  })

}

function testAuthentication (status, callback) {
  
  // if there's authentication
  if (config.auth) {
    
    // test if it's in the format user:password
    var split   = config.auth.split(':')
      , err = split.length !== 2 || !split[0] || !split[1]
      
    // set the status
    status.authentication = err ? color('set, not ok', 'red') : color('set, ok', 'green')
    
    // set error if any
    if (!err) status.error = true
    
  // else there's not authentication to test
  } else {
    
    // set the status
    status.authentication = color('not set', 'orange')
    
  }
  
  // back to you
  process.nextTick(callback)
}

function testPersistence (mongo, status, callback) {

  // if there's persistence
  if (mongo) {

    // ping it
    persistence.ping(mongo, function (err) {

      // set the status
      status.persistence = err ? color('set, not ok', 'red') : color('set, ok', 'green')

      // set the error if any
      if (err) status.error = true

      // back to you
      process.nextTick(callback)
      
    })

  // else there's no persistence to test
  } else {

    // set the status
    status.persistence = color('not set', 'orange')

    // back to you
    process.nextTick(callback)

  }
}

function testCorreios (status, callback) {

  // scrap it
  correios('30130010', function (err) {
    
    // set the status
    status.scraping = err ? color('not ok', 'red') : color('ok', 'green')
    
    // set the error if any
    if (err) status.error = true
    
    // back to you
    process.nextTick(callback)
    
  })

}

function color (text, color) { return util.format('<span class="color %s">%s</span>', color, text) }

