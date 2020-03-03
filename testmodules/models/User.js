const { JsonModel } = require("../modules/json-model")
const bcrypt = require("bcrypt")
const saltRounds = 12
const hashPassword = async password => await bcrypt.hash(password, saltRounds)
const verifyPassword = async (password, hash) => await bcrypt.compare(password, hash)

module.exports = new JsonModel({
  name: "User",
  fields: {
    username: {type: "string", required: true, unique: true},
    password: {type: "string", required: true},
    host: "string"
  },
  preSave: async (user, oldUser) =>  ({...user, password: user.password ? await hashPassword(user.password) : oldUser.password}),
  validators: [
    {field:"host", isValid: () => true, error: "invalid hostname"},
    {field:"host", isValid: () => true, error: "unable to reach host"}
  ],
  methods: {
    verifyPassword: async function (password) { return await verifyPassword(password, this.password) }
  },
  statics: {
    online: async function () { return await this.get() }
  }
})