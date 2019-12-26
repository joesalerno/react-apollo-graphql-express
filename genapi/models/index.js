const Sequelize = require("sequelize")
const fs = require("fs")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "testdb",
  logging: msg => fs.createWriteStream('./sql.log', {'flags': 'a'}).write(`${msg}\n`),
}) 

sequelize
  .authenticate()
  .then(() => { console.log("Connected to SQLite!") })
  .catch(err => { console.error("Unable to connect to SQLite:", err) })

sequelize.sync() //only use in Development...

module.exports = {
  //User: require("./User")(sequelize, Sequelize)
}