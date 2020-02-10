const jwt = require("jsonwebtoken")
const User = require ("../models/User")

module.exports = async token => {
  try {
    const decoded = jwt.verify(token, secretOrKey)
    if (decoded.exp >= (new Date().getTime() / 1000)) return ""
    return Boolean((await User.get({username: decoded.id})).length)
  } catch {
    console.log(`ERROR getting user from token: [${token}]`)
  }
  return ""
}