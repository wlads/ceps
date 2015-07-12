var ConnectionStringNotConfigured = require('./connection-string-not-configured')
  , SecretNotConfigured           = require('./secret-not-configured')

exports.check = function () {
  if (!process.env.CEPS_CONNECTIONSTRING) throw new ConnectionStringNotConfigured()
  if (!process.env.CEPS_SECRET)           throw new SecretNotConfigured()
}

exports.connectionString = function () {
  return process.env.CEPS_CONNECTIONSTRING
}

exports.secret = function () {
  return process.env.CEPS_SECRET
}

