const bcrypt = require("bcrypt")
const saltRounds = 12

module.exports = (sequelize, Types) => {
  const User = sequelize.define("User", {
      name: Types.STRING,
      email: Types.STRING,
      password: Types.STRING
    },{
      instanceMethods: {
        comparePassword: (password, done) => 
          bcrypt.compare(password, this.getDataValue("password"), (err, isMatch) => 
            err ? done(err) : done(null, isMatch)
          )
      }
    }
  )
  User.beforeValidate(user => {
    user.password = bcrypt.hashSync(user.password, saltRounds)
  })
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}