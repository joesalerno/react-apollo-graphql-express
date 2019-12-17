const express = require("express")
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)
const { User } = require("./models")

const app = express()

app.use(express.json());

app.use(session({
  store: new SQLiteStore,
  secret: "secret key 1234567890!",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAxe: 7 * 24 * 60 * 60 * 1000 }
}))

app.use((req, res, next) => {
  if (!req.session.views) req.session.views = {}
  req.session.views[req.path] = (req.session.views[req.path] || 0) + 1
  next()
})

app.get("/login", (req, res, next) => {
  if (req.query.user) {
    req.session.user = req.query.user
    res.send("You have logged in!")
  }
  else res.send("Enter a username after / in url, or send user field in post request object, or add to /?user= query parameter")
})

app.get("/login/:user", (req, res, next) => {
  req.session.user = req.params.user
  res.send("You have logged in!")
})

app.post("/register", async (req, res, next) => {
  if (!req.body.name)  return res.status(400).send("Must provide username (name)")
  if (!req.body.pass)  return res.status(400).send("Must provide password (pass)")
  if (!req.body.email) return res.status(400).send("Must provide email")
  if (await User.findOne({name: req.body.name}))  return res.status(400).send ("Username already taken")
  if (await User.findOne({name: req.body.email})) return res.status(400).send ("Email already taken")
  res.send(await User.create(req.body))
})

app.post("/login", (req, res, next) => {
  if (!req.body.user) return next("Must provide username")
  req.session.user = req.body.user
  res.send("You have logged in!")
})

app.get("/logout", (req, res, next) => {
  req.session.user = false
  res.send("You have logged out!")
})

app.get("/protected", (req, res, next) => {
  if (req.session.user) res.send(`Logged in as ${req.session.user}! Here is the secret information: 42`)
  else                  res.send("Not logged in! Unable to see secret information!")
})

app.all("*", (req, res, next) => {
  res.send("You viewed this page " + req.session.views[req.path] + " times")
})

app.listen(3000)