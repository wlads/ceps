var mongodb            = require('mongodb')
  , UpdatedMoreThanOne = require('./updated-more-than-one')

exports.connect = function (connectionString, callback) {
  mongodb.MongoClient.connect(connectionString, callback)
}

exports.ping = function (mongo, callback) {
  mongo.admin().ping(callback)
}

exports.upsert = function (mongo, endereco, callback) {

  endereco.data = new Date()

  var query   = { cep: endereco.cep }
    , options = { upsert: true }

  mongo.collection('enderecos').update(query, endereco, options, function (err, result) {
    if (!err && result.n !== 1) err = new UpdatedMoreThanOne(result.n)
    if (!err) console.log('Upserted "' + endereco.cep + '".')
    process.nextTick(function () { callback(err) })
  })

}

exports.retrieve = function (mongo, cep, callback) {
  var query = { cep: cep }
  mongo.collection('enderecos').findOne(query, callback)
}

