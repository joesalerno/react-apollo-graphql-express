const JsModel = require("./JsModel")

module.exports = new JsModel({
  name: "User",
  fields: {
    username: {type: "string", required: true, unique: true},
    password: {type: "string", required: true},
    host: "string"
  },
  preSave: (user, oldUser) => {
    return ({...oldUser, password: user.password ? `hash${user.password}` : oldUser.password})
  },
  validators: [
    {field:"host", isValid: () => true, error: "invalid hostname"},
    {field:"host", isValid: () => true, error: "unable to reach host"}
  ],
  methods: {
    validPassword: function (password) { return this.password === password }
  },
  statics: {
    loggedInUsers: async function () { return await this.get() }
  }
})