//-- Import -------------------------------------------------------------------
const express = require("express")
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)
const { User } = require("./models")
const morgan = require("morgan")
const fs = require("fs")

//-- Create an Express instance -----------------------------------------------
const app = express()

//-- Enable logging to access.log ---------------------------------------------
app.use(morgan("combined", {stream: fs.createWriteStream("./access.log", {flags: "a"})}))

//-- Parse incoming JSON into req.body object ---------------------------------
app.use(express.json())

//-- Enable sessions, save to SQLite database ---------------------------------
app.use(session({
  store: new SQLiteStore,
  secret: "secret key 1234567890!",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAxe: 7 * 24 * 60 * 60 * 1000 }
}))

//-- Middleware to count views of each page in session ------------------------
app.use(({ session, path }, res, next) => {
  if (!session.views) session.views = {}
  session.views[path] = (session.views[path] || 0) + 1
  next()
})

//-- Routes -------------------------------------------------------------------
app.all("/register", async ({ body }, res) => {
  if (!body.name)  return res.status(400).send("Must provide username (name)")
  if (!body.pass)  return res.status(400).send("Must provide password (pass)")
  if (!body.email) return res.status(400).send("Must provide email")
  if (await User.findOne({where: {name: body.name}}))  return res.status(400).send("Username already taken")
  if (await User.findOne({where: {name: body.email}})) return res.status(400).send("Email already taken")
  body.password = body.pass
  res.send(await User.create(body))
})

app.all("/login", ({ query, body, session }, res) => {
  if (query.user || body.user) {
    session.user = query.user || body.user
    return res.send("You have logged in!")
  }
  res.send("Enter a username after / in url, or send user field in post request JSON, or add to /?user= query parameter")
})

app.all("/login/:user", ({ params, session }, res) => {
  session.user = params.user
  res.send("You have logged in!")
})

app.all("/logout", ({ session }, res) => {
  session.user = false
  res.send("You have logged out!")
})

app.all("/protected", ({ session }, res) => {
  if (session.user) res.send(`Logged in as ${session.user}! Here is the secret information: 42`)
  else res.status(401).send("Not logged in! Unable to see secret information!")
})

app.all("*", ({ session, path }, res) => res.send("You viewed this page " + session.views[path] + " times"))

//-- Start the Express server -------------------------------------------------
app.listen(3000)
//-- Loop Server --------------------------------------------------------------