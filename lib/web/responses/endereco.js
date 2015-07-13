module.exports = function (endereco, res) {
  delete endereco._id
  delete endereco.data
  res.json(endereco)
}
