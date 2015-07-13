var ConnectionStringNotConfigured = require('./connection-string-not-configured')
  , AuthNotConfigured             = require('./auth-not-configured')

exports.check = function () {
  if (!process.env.CEPS_CONNECTIONSTRING) throw new ConnectionStringNotConfigured()
  if (!process.env.CEPS_AUTH)             throw new AuthNotConfigured()
}

exports.connectionString = function () {
  return process.env.CEPS_CONNECTIONSTRING
}

exports.auth = function () {
  return process.env.CEPS_AUTH
}

