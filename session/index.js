//-- Import -------------------------------------------------------------------
const express = require("express")
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)
const { User } = require("./models")
const morgan = require("morgan")
const fs = require("fs")

const port = 3000
const maxAge = 7 * 24 * 60 * 60 * 1000

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
  cookie: { maxAge }
}))

//-- Middleware to count views of each page in session ------------------------
app.use(({ session, path }, res, next) => {
  session.views[path] = (session.views[path] || 0) + 1
  next()
})

//-- Apply this middleware to routes you want to protect ----------------------
const authorize = (allowed) => ({session}, res, next) => 
  Array.isArray(allowed) && !allowed.includes(session.user) || session.user !== allowed
    ? next("Unauthorized")
    : next()

//-- Query the DB and validate credentials ------------------------------------
const authenticate = async (username, password) => {
  const user = await User.findOne({where: {name: username}})
  return user && user.validPassword(password)
}

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

const loginPage = `Username and password required. Enter "user" and "pass" fields to request body JSON or ?query= parameters, or go to /login/username/password`

app.all("/login", async ({ body, query, session }, res) => {
  Object.assign(body, query)
  if (!query.user || !query.pass) return res.status(401).send(loginPage)
  if (!await authenticate(query.user, query.pass)) return res.status(401).send("Unauthorized")
  session.user = query.user
  res.send("You have logged in!")
})

app.all("/login/:any", (req, res) => res.send(loginPage))

app.all("/login/:user/:pass", async ({ params, session }, res) => {
  if (!await authenticate(params.user, params.pass)) return res.status(401).send("Unauthorized")
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

app.all("/joeonly", authorize("joe"), (req, res) => res.send("This is the Joe only page, just for Joe!"))

app.all("*", ({ session, path }, res) => res.send("You viewed this page " + session.views[path] + " times"))

//-- Start the Express server -------------------------------------------------
app.listen(port, console.log(`API server listening on port ${port}`))
//---------------------------------~ LOOP ~------------------------------------