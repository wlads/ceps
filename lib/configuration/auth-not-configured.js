function AuthNotConfigured () {
  // name and message
  this.name   = this.constructor.name
  this.message = 'Configure "CEPS_AUTH" environment variable before running!'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
AuthNotConfigured.prototype = Object.create(Error.prototype)
AuthNotConfigured.prototype.constructor = AuthNotConfigured

// here, take it
module.exports = AuthNotConfigured

