function EmptyHtml (status) {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Empty HTML given.'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
EmptyHtml.prototype = Object.create(Error.prototype)
EmptyHtml.prototype.constructor = EmptyHtml

// here, take it
module.exports = EmptyHtml

