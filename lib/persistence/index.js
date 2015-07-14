var envvar   = require('envvar')
  , mongodb  = require('mongodb')

exports.connect = function (callback) {
  var cs = envvar.string('CEPS_CONNECTIONSTRING')
  mongodb.MongoClient.connect(cs, callback)
}

exports.upsert = function (mongo, endereco, callback) {

  endereco.data = new Date()

  var query   = { cep: endereco.cep }
    , options = { upsert: true }

  mongo.collection('enderecos').update(query, endereco, options, function (err, result) {
    if (!err && result.n !== 1) err = 'Updated "' + result.n + '" documents (should update just a single one)!'
    if (!err) console.log('Upserted "' + endereco.cep + '".')
    process.nextTick(function () { callback(err) })
  })

}

exports.retrieve = function (mongo, cep, callback) {
  var query = { cep: cep }
  mongo.collection('enderecos').findOne(query, callback)
}

exports.needsNew = function (endereco) {
  var lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  return lastMonth > endereco.data
}

