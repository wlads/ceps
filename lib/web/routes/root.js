var responses = require('../responses')

module.exports = function (req, res) {
  responses.redirectToGitHub(res)
}

