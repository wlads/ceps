function SecretNotConfigured () {
  // name and message
  this.name   = this.constructor.name
  this.message = 'Configure "CEPS_SECRET" environment variable before running!'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
SecretNotConfigured.prototype = Object.create(Error.prototype)
SecretNotConfigured.prototype.constructor = SecretNotConfigured

// here, take it
module.exports = SecretNotConfigured

