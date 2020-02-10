const { writeFile, readFile, readFileSync, writeFileSync } = require("fs")
const { promisify } = require("util")
const writeFileAsync = promisify(writeFile)
const readFileAsync = promisify(readFile)
const bcrypt = require("bcrypt")
const nanoid = require("nanoid")
const lockFile = require("proper-lockfile")
const validHostname = require("../modules/validHostname")
const isPingable = require("../modules/isPingable")
const { saltRounds } = require("../config")
const sleep = ms => new Promise(done => setTimeout(done, ms))

// init db or die --------------------------------------------------------------
const userdb = "./Models/User.json"
try { readFileSync(userdb) }
catch { writeFileSync(userdb, "[]") }
try { JSON.parse(readFileSync(userdb)) }
catch { throw Error( "Unable to parse database JSON" ) }

// -----------------------------------------------------------------------------
const validators = [
  {name: "username", error: "username required", isValid: val => Boolean(val)},
  {name: "username", error: "username already taken", isValid: (val, users) => !users.some(u => u.name === val)},
  {name: "password", error: "password required", isValid: val => Boolean(val)},
  {name: "host", error: "invalid hostname", isValid: val => !val || validHostname(val)},
  {name: "host", error: "hostname can't be localhost", isValid: val => Boolean(!val.match(/localhost|::1|127\.0\.0\.1/i))},
  {name: "host", error: "unable to reach host", isValid: async val => !val || (await isPingable(val))},
]
const validate = async (user, currentUsers) => {
  for (const validator of validators) {
    if (!await validator.isValid(user[validator.name], currentUsers)) return validator.error
  }
}

// -----------------------------------------------------------------------------
const exists = async uuid => Boolean((await get({uuid})).length)

const verifyPassword = async (username = "", password = "") => {
  let user = (await getOne({username}))
  if (!user) return false
  return await bcrypt.compare(password, user.password)
}

const hashPassword = async password => await bcrypt.hash(password, saltRounds)

// -----------------------------------------------------------------------------
const get = async query => {
  let users 
  try { users = JSON.parse((await readFileAsync(userdb)).toString()) }
  catch { return [] }
  if (typeof query == "object") {
    users = users.filter( user => Object.keys(query).every(key => user[key] && user[key] === query[key]))
  }
  return users
}

const getOne = async query => {
  let users = await get(query)
  if (users.length) return users[0]
  return undefined
}

const add = async user => {
  while (!await lockFile.lock(userdb)) await sleep(1)
  const users = await get()
  const error = await validate(user, users)
  if (error) {
    lockFile.unlock(userdb)
    return error
  }
  const hash = await hashPassword(user.password)
  users.push({username: user.username, password: hash, uuid: nanoid()})
  let signal = await writeFileAsync(userdb, JSON.stringify(users, null, 2))
  lockFile.unlock(userdb)
  return signal
}

const edit = async (uuid, newUser) => {
  while (!await lockFile.lock(userdb)) await sleep(1)
  if (!uuid) {
    lockFile.unlock(userdb)
    return "uuid required"
  }
  let user = (await getOne({uuid}))
  if (!user) {
    lockFile.unlock(userdb)
    return "user not found"
  }
  const users = (await get()).filter(u => u.uuid !== uuid)
  if (newUser.password) newUser.password = await hashPassword(newUser.password)
  newUser = {...user, ...newUser, uuid:user.uuid}
  const error = await validate(newUser, users)
  if (error) {
    lockFile.unlock(userdb)
    return error
  }
  users.push(newUser)
  let signal = await writeFileAsync(userdb, JSON.stringify(users, null, 2))
  lockFile.unlock(userdb)
  return signal
}

const deleteById = async uuid => {
  while (!await lockFile.lock(userdb)) await sleep(1)
  const users = (await get()).filter(u => u.uuid !== uuid)
  let signal = await writeFileAsync(userdb, JSON.stringify(users, null, 2))
  lockFile.unlock(userdb)
  return signal
}

module.exports = { 
  get, getOne, add, edit, deleteById, exists, verifyPassword, hashPassword,
  validate: async user => validate(user, get()),
}