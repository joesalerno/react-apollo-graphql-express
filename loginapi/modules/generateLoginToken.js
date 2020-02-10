const jwt = require("jsonwebtoken")
const { expireLoginTokenMinutes, secretOrKey } = require("../config")

module.exports = (username) => jwt.sign(
  {
    id: username,
    exp: parseInt((new Date().getTime() + expireLoginTokenMinutes * 60000) / 1000)
  },
  secretOrKey
)