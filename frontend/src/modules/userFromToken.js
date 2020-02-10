const jwt = require("jsonwebtoken")

module.exports = token => {
  try {
    const decoded = jwt.decode(token)
    if (decoded.exp >= (new Date().getTime() / 1000)) return ""
    return (decoded.id)
  } catch {
    console.log(`ERROR getting user from token: [${token}]`)
  }
  return ""
}