function UpdatedMoreThanOne (n) {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Updated "' + n + '" documents (should updated just one).'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
UpdatedMoreThanOne.prototype = Object.create(Error.prototype)
UpdatedMoreThanOne.prototype.constructor = UpdatedMoreThanOne

// here, take it
module.exports = UpdatedMoreThanOne

