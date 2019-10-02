const jwt = require("jsonwebtoken")
const { expireLoginTokenMinutes } = require("../config")

module.exports = (username, secretOrKey) => jwt.sign(
  {
    id: username,
    exp: parseInt((new Date().getTime() + expireLoginTokenMinutes * 60000) / 1000)
  },
  secretOrKey
)