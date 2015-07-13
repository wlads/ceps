module.exports = function (cep, res) {
  if (cep) return false
  else {
    res.sendStatus(400)
    return true
  }
}
