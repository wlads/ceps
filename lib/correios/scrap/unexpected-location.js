function UnexpectedLocation (location) {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Unexpected location: "' + location + '".'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
UnexpectedLocation.prototype = Object.create(Error.prototype)
UnexpectedLocation.prototype.constructor = UnexpectedLocation

// here, take it
module.exports = UnexpectedLocation

