const bcrypt = require("bcrypt")
const saltRounds = 12

module.exports = (sequelize, Types) => {
  const User = sequelize.define("User", {
      name: Types.STRING,
      email: Types.STRING,
      password: Types.STRING
    },{}
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  User.beforeValidate(user => {
    if (user.changed("password")) user.password = bcrypt.hashSync(user.password, saltRounds)
  })
  
  return User
}