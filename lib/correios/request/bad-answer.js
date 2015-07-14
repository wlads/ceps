function BadAnswer (status) {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Correios server returned ' + status + '.'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
BadAnswer.prototype = Object.create(Error.prototype)
BadAnswer.prototype.constructor = BadAnswer

// here, take it
module.exports = BadAnswer

