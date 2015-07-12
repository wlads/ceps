module.exports = function (endereco, res) {
  if (endereco) return false
  else {
    res.sendStatus(204)
    return true
  }
}
