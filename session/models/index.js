const Sequelize = require("sequelize")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "testdb"
})

sequelize
  .authenticate()
  .then(() => { console.log("Connected to SQLite!") })
  .catch(err => { console.error("Unable to connect to SQLite:", err) })

sequelize.sync()

const User = require("./User")(sequelize, Sequelize)

module.exports = {
  User
}