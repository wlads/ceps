var configuration = require('./configuration')
  , mongodb       = require('mongodb')

exports.connect = function (callback) {
  var connectionString = configuration.connectionString()
  mongodb.MongoClient.connect(connectionString, callback)
}

exports.documentDate = function (document) {
  return new mongodb.ObjectID(document._id).getTimestamp()
}

exports.upsert = function (db, endereco, callback) {
  db.collection('enderecos').update(
    { cep: endereco.cep },
    endereco,
    function (err, count) {
      if (!err && count !== 1) err = 'Update ' + count + ' documents (should update just a single one).'
      process.nextTick(function () { callback(err) })
    }
  )
}

exports.retrieve = function (db, cep, callback) {
  db.collection('enderecos').findOne({ cep: cep }, callback)
}
