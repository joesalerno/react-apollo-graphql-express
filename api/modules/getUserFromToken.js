const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { secretOrKey } = require("../config")

module.exports = async jsonwebtoken => {
  const decoded = jwt.verify(jsonwebtoken, secretOrKey)
  return await User.findByIdOrName(decoded.id)
}