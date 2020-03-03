/*//////////////////////////////////////////////////////////////////////////////*

JsModel.js:  Very simple promise-based JSON database model
Joe Salerno 2020

*//////////////////////////////////////////////////////////////////////////////*/
/*
function Example() {
  const JsModel = require("./models/JsModel")

  // Try to load or create new db at ./models/User.json:
  const Users = new JsModel ({ 
    name: "User",
    fields:
      name: {"username", type: "string", required: true, unique: true},
      name: {"password", type: "string"},
    ,
  })
  
  // Then, asynchronously add a user:
  Users.add({name: "bob", password: "123"})
  
  // Edit the user:
  .then(bob => Users.edit(bob._id, {name: "jim", password: "cool"} ))
  
  // And delete the user:
  .then(jim => Users.deleteById(jim._id))
  
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
  // Note: Hook will run once for each item to be changed:
  const Users = new JsModel ({
    //...
    preSave: (user, otherRecords) => ({...user, password: hash(password)}),
  })

  // You can add custom static methods to the model class by including them in the schema.
  // Note: Don't use arrow functions or "this" will be bound incorrectly
  const Users = new JsModel ({
    //...
    statics: {
      coolUsers: async function () { return await this.get({}) },
    },
  })

  // You can add custom methods to records
  const Users = new JsModel ({
    //...
    methods: {

    },
  })

  // You can add virtual ie. calculated fields to records returned
  const Users = new JsModel ({
    //...
    virtuals: {
      fullName: user => `${user.firstName} ${user.lastName}`
    }
  })

}
*/
////////////////////////////////////////////////////////////////////////////////

const { readFileSync, writeFileSync } = require("fs")
const Locker = require("../modules/locker")
const generateId = () => Date.now().toString(36).padStart(8, "0") +  Math.floor((Math.random() * 1679616)).toString(36).padStart(4, "0")
const createdAt = record => parseInt(record._id.slice(0, 8), 36)

const _validateFields = fields => {
  if (Array.isArray(fields) || typeof fields !== "object") throw Error( `Invalid schema. Must be object containing field definitions. Got: ${typeof fields}` )
  for (const f in fields) { 
    let field = fields[f]
    if (typeof field === "string") {
      for (const type of ["undefined", "string", "number", "boolean"]) {
        if (field === type) field = { type }
      }
    }
    if (!typeof field === "object") throw Error( `Invalid schema field "${f}". Must be type string or a field definition object. Got: ${typeof field}` )
    for (const prop in field) if (!prop.match(/^(type|required|unique|_id)$/)) throw Error( `Invalid schema field property "${prop}". Valid properties are type, required, unique, and preSave` )
    if (!(typeof field.unique).match(/boolean|undefined/)) throw Error( `Unique field must be a boolean or undefined. Got: ${typeof field}` )
    if (!(typeof field.required).match(/boolean|undefined/)) throw Error( `Required field must be a boolean or undefined. Got: ${typeof field}` )
    if (field.type && !field.type.match(/undefined|string|number|boolean/)) throw Error( `Type field must be undefined, string, number, or boolean. Got: ${field.type}` )
  }
}

const _validateValidators = (validators, fields) => {
  if (typeof validators === "undefined") return
  if (!Array.isArray(validators)) throw Error( `Invalid validators. Must be array of validator objects. Got: ${typeof validators}` )
  for (let i = 0; i < validators.length; i++) {
    if (typeof validators[i] !== "object") throw Error( `Invalid validator. Must be an object having a field and isValid method. Got: ${typeof validators[i]}` )
    for (const key in validators[i]) {
      if (!key.match(/^(field|isValid|error)$/)) throw Error ( `Invalid validator property. Valid properties are field, isValid, and error. Got: ${key}` )
    }
    if (typeof validators[i].field !== "string") throw Error ( `Invalid validator field. Must be a string equal to a schema field name. Got: ${typeof validators[i].field}` )
    if (!(Object.keys(fields).includes(validators[i].field))) throw Error ( `Invalid validator field. Must be a string equal to a schema field name. Got: ${validators[i].field}` )
    if (typeof validators[i].isValid !== "function") throw Error ( `Invalid isValid function for ${validators[i].field}. Must be a function. Got: ${typeof validators[i].isValid}` )
    if (validators[i].error && typeof validators[i].error !== "string") throw Error ( `Invalid validator error. Must be a string. Got: ${typeof validators[i].error}` )
  }
}

const _validateStatics = statics => {
  if (typeof statics === "undefined") return
  if (typeof statics !== "object") throw Error( `Invalid static functions. Must be an object containing functions or undefined. Got: ${typeof statics}` )
  for (const key in statics) if (typeof statics[key] !== "function") throw Error(`Invalid static function ${key}. Must be a function. Got: ${typeof statics[key]}`)
}

const _validateMethods = (methods, schema) => {
  if (typeof methods === "undefined") return
  if (typeof methods !== "object") throw Error( `Invalid methods. Must be an object containing methods or undefined. Got ${typeof methods}` )
  for (const key in methods) {
    if (typeof methods[key] !== "function") throw Error( `Invalid method ${key}. Must be a function. Got: ${typeof methods[key]}`)
    if (Object.keys(schema).includes(key)) throw Error( `Invalid method name ${key}. Can't be the same as schema field name` )
  } 
}

const _applyStatics = model => {
  for (const f of Object.keys(model._model._statics || {})) model[f] = model._model._statics[f].bind(model)
}

const _applyMethods = (methods, recordOrRecords) => {
  if (typeof recordOrRecords === undefined || typeof methods === undefined) return undefined
  const apply = (methods, record) => { 
    for (const key in methods) record[key] = methods[key].bind(record)
  }
  if (Array.isArray(recordOrRecords)) {
    for (const record of recordOrRecords) apply(methods, record)
    return recordOrRecords
  }
  apply(methods, recordOrRecords)
  return recordOrRecords
}

class _JsonModel { constructor({name, fields, validators, preSave, statics, methods, saveDir = "./data"}) { ////////////////////////////////
    if (!name || typeof name !== "string") throw Error ("Invalid model name")

    this._db = `${saveDir}/${name}.json`

    this._locker = new Locker()

    try { readFileSync(this._db) }
    catch { writeFileSync(this._db, "[]") }
    try { JSON.parse(readFileSync(this._db)) }
    catch { throw Error( "Unable to parse database JSON" ) }

    fields._id = {type: "string", required: true, unique: true}
    _validateFields(fields)
    this._schema = fields
    
    _validateValidators(validators, fields)
    this._validators = validators
    
    _validateStatics(statics)
    this._statics = statics

    _validateMethods(methods, this._schema)
    this._methods = methods

    if (!(typeof preSave).match(/function|undefined/)) throw Error ( "Invalid preSave hook. Must be a function or undefined" )
    this._preSaveHook = preSave
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  async _writeDb (newRecordset) {
    let signal = writeFileSync(this._db, JSON.stringify(newRecordset, null, 2))
    await this._locker.unlock(this._db)
    return signal
  }

  async _validate(record, currentRecords) {
    for (const key in this._schema) {
      if (key !== "_id" && this._schema[key].required && !Boolean( record[key]))
        return `required validation failed for key ${key}`
    }
    for (const key in record) {
      if (this._methods && Object.keys(this._methods).includes(key)) continue //methods aren't going to be fields in schema

      if (!this._schema[key]) return `type validation failed. Key "${key}" is not in schema`

      if (this._schema[key].unique && currentRecords && currentRecords.length && currentRecords.some(r => r[key] === record[key] && r._id !== record._id))
        return `unique validation failed for key ${key}`

      if (!(typeof record[key]).match(/undefined|string|number|boolean/))
        return `type validation failed for key ${key}. Must be undefined, string, number, or boolean. Got: ${typeof record[key]}`

      if (this._schema[key].type && (typeof record[key] === undefined || typeof record[key] !== this._schema[key].type))
        return `type validation failed for key ${key}. Must match ${this._schema[key].type}. Got: ${typeof record[key]}`
    }
    for (const validator of this._validators || []) {
      if (!await validator.isValid(record[validator.field], currentRecords))
        return validator.error || `validation failure on key ${key}`
    }
  }

  async _preSave(changes, record, recordSet) {
    return this._preSaveHook ? await this._preSaveHook(changes, record, recordSet) : changes 
  }

  //// Interface: //////////////////////////////////////////////////////////////////////////////////

  /////////////////
  //   Get One   //
  /////////////////
  async getOne (query) {
    let res = await this.get(query)
    if (!res.length) return undefined
    return _applyMethods(this._methods, res[0])
  }

  //////////////////
  //   Get Many   //
  //////////////////
  async get (query) {
    let res
    try { res = JSON.parse(readFileSync(this._db)) }
    catch { return [] }
    if (typeof query === "object") res = res.filter(r => Object.keys(query).every(key => r[key] && r[key] === query[key]))
    return _applyMethods(this._methods, res)
  }

  /////////////
  //   Add   //
  /////////////
  async add (record) {
    if (!record) throw Error ( "Must provide record" )
    await this._locker.lock(this._db)
    const records = await this.get({})
    try { record = await this._preSave(record, {}, records) }
    catch(error) {
      await this._locker.unlock(this._db)
      throw Error ( `preSave hook error: ${error}` )
    }
    record._id = generateId()
    const error = await this._validate(record, records)
    if (error) {
      await this._locker.unlock(this._db)
      throw Error ( `Error: ${error}` )
    }
    record = _applyMethods(this._methods, record)
    records.push(record)
    return (await this._writeDb(records)) || record
  }

  //////////////
  //   Edit   //
  //////////////
  async edit (_id, newFields) {
    if (!_id || !newFields) throw Error ( "Must provide _id and new record" )
    await this._locker.lock(this._db)
    let record = (await this.getOne({_id: _id}))
    if (!record) {
      await this._locker.unlock(this._db)
      throw Error ( "Record not found" )
    }
    
    let records = await this.get()
    let preSaved
    try {
      preSaved = await this._preSave(newFields, record, records)
    } catch(error) {
      await this._locker.unlock(this._db)
      throw Error ( `preSave hook error: ${error}` )
    }
    record = {...record, ...preSaved, _id:record._id}
    records = records.filter(u => u._id !== _id )
    const error = await this._validate(record, records)
    if (error) {
      await this._locker.unlock(this._db)
      throw Error ( `Validation error: ${error}` )
    }
    record = _applyMethods(this._methods, record)
    records.push(record)
    return (await this._writeDb(records)) || record
  }

  //////////////////
  //    Delete    //
  //////////////////
  async delete (filter) {
    if (!filter) throw Error ( "Must provide filter object" )
    await this._locker.lock(this._db)
    const records = await this.get()
    return (await this._writeDb(records.filter(r => !Object.keys(filter).every(key => r[key] && r[key] === filter[key])))) || filter
  }
}

////////////////////////////////////////////////////////////////////////////////

class JsonModel { constructor( schema ) {

  this._model = new _JsonModel( schema )

  this.add    = record           => this._model.add( record )
  this.delete = filter           => this._model.delete( filter )
  this.edit   = (_id, newFields) => this._model.edit( _id, newFields )
  this.get    = query            => this._model.get( query )
  this.getOne = query            => this._model.getOne( query )
  
  _applyStatics( this )

}}

module.exports = { JsonModel, createdAt, generateId }