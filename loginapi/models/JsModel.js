/*//////////////////////////////////////////////////////////////////////////////

JsModel.js:  Very simple promise-based JSON database model
Joe Salerno 2020

Example:

//Import the module
const JsModel = require("./models/JsModel")

//Try to load or create new db at ./models/User.json:
const Users = new JsModel ({ 
  name: "User",
  fields: [
    {name: "username", type: "string", required: true, unique: true},
    {name: "password", type: "string", required: true},
  ],
})

// Then, asynchronously add a user:
Users.add({name: "bob", password: "123"})

// Edit the user:
.then(bob => Users.edit(bob.uuid, {name: "jim", password: "cool"} ))

// And delete the user:
.then(jim => Users.deleteById(jim.uuid))

// You can add custom validators for any field, with optional custom error
const Users = new JsModel({
  //...
  validators: [{
    field: "username",
    error: "Only letters allowed!",
    isValid: username => username.match(/abcdefghijklmnopqrstuvwxyz/i)
  }],
})

// You can also set a preSave hook to run before any add or edit:
const Users = new JsModel ({
  //...
  preSave: (user, otherRecords) => ({...user, password: hash(password)}),
})

*///////////////////////////////////////////////////////////////////////////////

const { writeFile, readFile, readFileSync, writeFileSync } = require("fs")
const { promisify } = require("util")
const writeFileAsync = promisify(writeFile)
const readFileAsync = promisify(readFile)
const nanoid = require("nanoid")
const lockFile = require("proper-lockfile")

const sleep = ms => new Promise(done => setTimeout(done, ms))

const _validateFields = fields => {
  if (!Array.isArray(fields)) throw Error( `Invalid schema. Must be array of field objects` )
  for (let i = 0; i < fields.length; i++) {
    if (typeof fields[i] !== "object") throw Error( `Invalid schema field. Must be an object having a unique name and valid properties. Valid properties are name, fields, validators, preSave` )
    for (const key in fields[i]) {
      if (!key.match(/^(name|type|required|unique)$/)) throw Error ( "Invalid schema field property. Valid properties are name, type, required, unique, and preSave" )
    }
    if (!(typeof fields[i].unique).match(/boolean|undefined/)) throw Error ( "Unique field must be a boolean or undefined" )
    if (!(typeof fields[i].required).match(/boolean|undefined/)) throw Error ( "Required field must be a boolean or undefined" )
    if (typeof fields[i].name !== "string" || !fields[i].name) throw Error ( "Each field must have a name" )
    if (!fields[i].type || !fields[i].type.match(/string|object|array|boolean|/)) throw Error ( `Type field must be undefined or string, object, array, or boolean` )
    for (let j = i+1; j < fields.length; j++) {
      if (fields[i].name === fields[j].name) throw Error ( "Each field name must be unique" )
    }
  }
}

const _validateValidators = (validators, fields) => {
  if (typeof validators === "undefined") return
  if (!Array.isArray(validators)) throw Error( `Invalid validators. Must be array of validator objects` )
  for (let i = 0; i < validators.length; i++) {
    if (typeof validators[i] !== "object") throw Error( `Invalid validator. Must be an object having a field and isValid method` )
    for (const key in validators[i]) {
      if (!key.match(/^(field|isValid|error)$/)) throw Error ( "Invalid validator property. Valid properties are field, isValid, and error" )
    }
    if (typeof validators[i].field !== "string" || !fields.some(f => f.name === validators[i].field))
      throw Error ( "Invalid validator field. Must be a string equal to a schema field name" )
    if (typeof validators[i].isValid !== "function") throw Error ( `Invalid isValid function for ${validators[i].field}. Must be a function` )
    if (validators[i].error && typeof validators[i].error !== "string") throw Error ( "Invalid validator error. Must be a string" )
  }
}

class _JsModel { constructor({name, fields, validators, preSave}) { ////////////////////////////////
    if (!name || typeof name !== "string") throw Error ("Invalid model name")

    this._db = `./models/${name}.json`
    try { readFileSync(this._db) }
    catch { writeFileSync(this._db, "[]") }
    try { JSON.parse(readFileSync(this._db)) }
    catch { throw Error( "Unable to parse database JSON" ) }

    fields = { ...fields, uuid: { name: "uuid", type: "string", required: true, unique: true } }
    _validateFields(fields)
    this._schema = fields
    
    _validateValidators(validators, fields)
    this._validators = validators

    if (!(typeof preSave).match(/function|undefined/)) throw Error ( "Invalid preSave hook. Must be a function or undefined" )
    this._preSaveHook = preSave
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////

  async _lockDb() {
    let gotLock = false
    while (!gotLock) {
      try {
        gotLock = await lockFile.lock(this._db)
      } catch {
        //loop forever
      }
      await sleep(1)
    }
  }

  async _writeDb (newRecordset) {
    let signal = await writeFileAsync(this._db, JSON.stringify(newRecordset, null, 2))
    lockFile.unlock(this._db)
    return signal
  }

  async _validate(record, currentRecords) {
    for (const key in record) {
      let schemaField = this._schema.filter(field => field.name === key)[0]
      //if (key === "uuid") schemaField = {name: "uuid", type: "string", required: true, unique: true}
      if (!schemaField) return `type validation failed. key ${key} is not in schema`
      if (schemaField.unique && currentRecords && currentRecords.length && currentRecords.some(r => r[key] === record[key] && r.uuid !== record.uuid))
        return `unique validation failed for key ${key}`

      if (schemaField.required && typeof record[key] === undefined) 
        return `required validation failed for key ${key}`

      if (schemaField.type && (typeof record[key] === undefined || typeof record[key] !== schemaField.type))
        return `type validation failed for key ${key}`
    }
    for (const validator of this._validators || []) {
      if (!await validator.isValid(record[validator.field], currentRecords))
        return validator.error || "validation failure"
    }
  }

  async _preSave(record, oldRecord) { return this._preSaveHook ? await this._preSaveHook(record, oldRecord) : record }

  ////////////////
  //   Exists   //
  ////////////////
  async exists (query) { return Boolean((await this.get(query)).length) }

  /////////////////
  //   Get One   //
  /////////////////
  async getOne (query) {
    let res = await this.get(query)
    if (res.length) return res[0]
    return undefined
  }

  //////////////////
  //   Get Many   //
  //////////////////
  async get (query) {
    let res
    try { res = JSON.parse((await readFileAsync(this._db)).toString()) }
    catch { return [] }
    if (typeof query == "object") {
      res = res.filter(r => Object.keys(query).every(key => r[key] && r[key] === query[key]))
    }
    return res
  }

  /////////////
  //   Add   //
  /////////////
  async add (record) {
    if (!record) throw Error ( "Must provide record")
    await this._lockDb()

    const records = await this.get()

    try {
      record = await this._preSave(record, records)
    } catch(e) {
      lockFile.unlock(this._db)
      throw new Error ( `preSave hook error: ${e}`)
    }
    const error = await this._validate(record, records)
    if (error) {
      console.log(`Error: ${error}`)
      lockFile.unlock(this._db)
      return undefined
    }

    record.uuid = nanoid()

    records.push(record)
    return (await this._writeDb(records)) || record
  }

  //////////////
  //   Edit   //
  //////////////
  async edit (uuid, newRecord) {
    if (!uuid || !newRecord) throw Error ( "Must provide uuid and new record")
    await this._lockDb()
    
    let record = (await this.getOne({uuid}))
    if (!record) {
      lockFile.unlock(this._db)
      return "record not found"
    }
    
    let records = await this.get()
    try {
      newRecord = await this._preSave(newRecord, records)
    } catch(e) {
      console.log(`Error: ${error}`)
      lockFile.unlock(this._db)
      throw new Error ( `preSave hook error: ${e}`)
    }
    records = records.filter(u => u.uuid !== uuid)
    
    newRecord = {...record, ...newRecord, uuid:record.uuid}
    const error = await this._validate(newRecord, records)
    if (error) {
      console.log(error)
      lockFile.unlock(this._db)
      return error
    }

    records.push(newRecord)
    return (await this._writeDb(records)) || newRecord
  }

  ////////////////////////
  //    Delete by ID    //
  ////////////////////////
  async deleteById (uuid) {
    if (!uuid) throw Error ("Must provide uuid")
    await this._lockDb()
    const records = await this.get()
    return (await this._writeDb(records.filter(u => u.uuid !== uuid))) || uuid
  }

  ///////////////////////
  //    Delete Many    //
  ///////////////////////
  async delete (filter) {
    if (!filter) throw Error ("Must provide filter object")
    await this._lockDb()
    const records = await this.get()
    return (await this._writeDb(records.filter(r => !Object.keys(filter).every(key => r[key] && r[key] === filter[key])))) || filter
  }
}

module.exports = class JsModel {
  constructor(args) {
    this._model     = new _JsModel(args)
    this.add        = record            => this._model.add(record)
    this.delete     = filter            => this._model.delete(filter)
    this.deleteById = uuid              => this._model.deleteById(uuid)
    this.edit       = (uuid, newRecord) => this._model.edit(uuid, newRecord)
    this.exists     = query             => this._model.exists(query)
    this.get        = query             => this._model.get(query)
    this.getOne     = query             => this._model.getOne(query)
  }
}