var envvar = require('envvar')

exports.cs   = envvar.string('CEPS_CONNECTIONSTRING')
exports.auth = envvar.string('CEPS_AUTH')

