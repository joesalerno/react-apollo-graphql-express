const express = require("express")
const next = require("next")
const morgan = require("morgan")
const fs = require("fs")
const session = require("express-session")
const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = app.getRequestHandler()
const PORT = 3000

app.prepare()
  .then(() => {
    const server = express()

    server.use(morgan("combined", {
      stream: fs.createWriteStream("./access.log", {flags: "a"}),
      skip: (req, res) => req.url.includes("/_next/")
    }))

    server.use(express.json())

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