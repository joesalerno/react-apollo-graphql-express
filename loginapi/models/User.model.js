const JsModel = require("./JsModel")

module.exports = new JsModel ({ 
  name: "Users",

  fields: [
    {name: "username", type: "string", required: true, unique: true},
    {name: "password", type: "string", required: true},
    {name: "host", type: "string", required: true}
  ],
  
  statics: {
    loggedInUsers: async function () {
      return await this.get({})
    }
  },
  methods: {
    verifyPassword: function (pass) {
      return(this.password === pass)
    }
  },
})