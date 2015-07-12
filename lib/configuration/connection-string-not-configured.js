function ConnectionStringNotConfigured () {
  // name and message
  this.name   = this.constructor.name
  this.message = 'Configure "CEPS_CONNECTIONSTRING" environment variable before running!'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
ConnectionStringNotConfigured.prototype = Object.create(Error.prototype)
ConnectionStringNotConfigured.prototype.constructor = ConnectionStringNotConfigured

// here, take it
module.exports = ConnectionStringNotConfigured

