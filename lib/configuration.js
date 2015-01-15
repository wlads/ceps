exports.connectionString = function () {
  var cs = process.env.CEPS_CONNECTIONSTRING
  if (cs) return cs
  else throw new Error('Configure "CEPS_CONNECTIONSTRING" environment variable before running.')
}
