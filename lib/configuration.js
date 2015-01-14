exports.connectionString = function () {
  var cs = process.env.CORREIOS_CONNECTIONSTRING
  if (cs) return cs
  else throw new Error('Configure "CORREIOS_CONNECTIONSTRING" environment variable before running.')
}
