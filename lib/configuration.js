exports.connectionString = function () {
  var cs = process.env.CEPS_CONNECTIONSTRING
  if (cs) return cs
  else throw new Error('Configure "CEPS_CONNECTIONSTRING" environment variable before running.')
}

exports.secret = function () {
  var auth = process.env.CEPS_SECRET
  if (auth) return auth
  else throw new Error('Configure "CEPS_SECRET" environment variable before running.')
}

