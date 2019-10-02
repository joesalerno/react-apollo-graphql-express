const passport = require("passport")
const { ExtractJwt, Strategy } = require("passport-jwt")
const { User } = require("../models")

const { secretOrKey } = require("../config")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretOrKey

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.id }, function(err, user) {
      if (err) return done(err)
      if (!user || !user.enabled) return done(null, false)
      return done(null, jwt_payload.id)
    })
  })
)

module.exports = passport.authenticate("jwt", { session: false })