function UnexpectedAnswerAmount (amount) {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Unexpected answer amount: "' + amount + '".'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
UnexpectedAnswerAmount.prototype = Object.create(Error.prototype)
UnexpectedAnswerAmount.prototype.constructor = UnexpectedAnswerAmount

// here, take it
module.exports = UnexpectedAnswerAmount

