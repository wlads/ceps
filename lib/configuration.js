var ConnectionStringNotConfigured = require('./errors/connection-string-not-configured')
  , SecretNotConfigured           = require('./errors/secret-not-configured')

exports.check = function () {
  if (!process.env.CEPS_CONNECTIONSTRING) throw new ConnectionStringNotConfigured()
  if (!process.env.CEPS_SECRET)           throw new SecretNotConfigured()

  if (!process.env.CEPS_CONNECTIONSTRING) throw new ConnectionStringNotConfigured()
  if (!process.env.CEPS_SECRET)           throw new SecretNotConfigured()
}

exports.connectionString = process.env.CEPS_CONNECTIONSTRING
exports.secret           = process.env.CEPS_SECRET

