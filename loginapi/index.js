const express = require("express")
const cors = require ("cors")
const { generateLoginToken } = require("./modules")
const User = require("./models/User")
const { port } = require("./config")

const app = express()

app.use(cors()) //enable ALL cors requests!!
app.use(express.json())

app.use("/users/edit", async (req, res) => {
  const status = await User.edit(req.body.uuid, req.body)
  res.status(status ? 400 : 200).send(status)
})

app.use("/users/:username", async (req, res) => {
  return res.send(await User.get({username: req.params.username}))
}) 

app.use("/users", async (req, res) => {
  return res.send(await User.get(req.body))
})

app.use("/login", async (req, res) => {
  const { username, password } = req.body
  if (!await User.verifyPassword(username, password)) return res.status(400).send("Invalid username or password")
  return res.send(generateLoginToken(username))
})

app.use("/register", async (req, res) => {
  const { username, password } = req.body
  if ((await User.get({username})).length) return res.status(400).send("Username already taken")
  if (!username) return res.status(400).send("Username required")
  if (!password) return res.status(400).send("Password required")
  if (await User.add({username, password})) return res.status(400).send("Error adding user to database")
  return res.send(generateLoginToken(username))
})

app.listen(port, () => console.log(`API Server running on http://localhost:${port}`))