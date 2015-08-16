var envvar = require('prefixed-envvar')

exports.mongo = envvar('CEPS', 'MONGO') || envvar('MONGOLAB_URI')
exports.auth  = envvar('CEPS', 'AUTH')

