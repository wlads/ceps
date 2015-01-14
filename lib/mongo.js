var configuration = require('./configuration')
  , mongodb       = require('mongodb')

exports.connect = function (callback) {
  var connectionString = configuration.connectionString()
  mongodb.MongoClient.connect(connectionString, callback)
}

exports.insert = function (db, endereco) {
  db.collection('enderecos').insert(endereco)
}

exports.retrieve = function (db, cep, callback) {
  db.collection('enderecos').findOne({ cep: cep }, callback)
}
