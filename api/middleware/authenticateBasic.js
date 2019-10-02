const passport = require("passport")
const { BasicStrategy } = require("passport-http")
const { User } = require("../models")

passport.use(
  new BasicStrategy(function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      user.verifyPassword(password, function(err, isMatch) {
        if (err) return done(err)
        if (!isMatch) return done(null, false)
        return done(null, user.username)
      })
    })
  })
)

module.exports = passport.authenticate("basic", { session: false })
