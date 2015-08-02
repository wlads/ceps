var envvar = require('envvar')

exports.cs   = envvar.string('CEPS_CONNECTIONSTRING', '') || envvar.string('MONGOLAB_URI', '') || null
exports.auth = envvar.string('CEPS_AUTH', '') || null

