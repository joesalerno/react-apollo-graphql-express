const Database = require("better-sqlite3")
const db = new Database("foobar.db", { verbose: console.log })

db.prepare(`CREATE TABLE IF NOT EXISTS Users (
  uuid varchar(255) NOT NULL PRIMARY KEY,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  host varchar(255)
)`).run()

const add = ({uuid, username, password, host}) => {
  const info = db.prepare(`INSERT INTO Users (uuid, username${password?", password":""}${host?", host":""}) VALUES (?, ?, ${password?"?,":""} ${host?"?":""})`).run(uuid, username, password, host)
}

const edit = db.prepare("UPDATE Users SET ")

const info = stmt.run('Joe', "1asdf", "12312", "09322");

console.log(info.changes); // => 1