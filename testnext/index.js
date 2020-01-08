const express = require("express")
const next = require("next")
const morgan = require("morgan")
const fs = require("fs")
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)
const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = app.getRequestHandler()
const PORT = 3001
const MAXAGE = 7 * 24 * 60 * 60 * 1000

app.prepare()
  .then(() => {
    const server = express()

    server.use(morgan("combined", {
      stream: fs.createWriteStream("./access.log", {flags: "a"}),
      skip: (req, res) => req.url.includes("/_next/")
    }))

    server.use(express.json())

    // var store = new SQLiteStore

    // server.use(session({
    //   store,
    //   secret: "secret key 1234567890!",
    //   resave: false,
    //   saveUninitialized: true,
    //   cookie: { MAXAGE }
    // }))

    // //-- Middleware to count views of each page in session ------------------------
    // server.use(({ session, path }, res, next) => {
    //   session.views = session.views || {}
    //   session.views[path] = (session.views[path] || 0) + 1
    //   session.test = "TEST"
    //   next()
    // })

    server.get("*", handle)

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`Express Server listening on http://localhost:${PORT}`)
    })
  })

  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })