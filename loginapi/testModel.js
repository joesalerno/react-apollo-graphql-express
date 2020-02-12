const JsModel = require("./models/JsModel")
const fs = require ("fs")

fs.writeFileSync("./models/Users.json", "[]")

userIsCoolModule = user => user.username === "Joe"
verifyPasswordModule = password => password === "Password"

const Users = new JsModel ({ 
  name: "Users",
  fields: [
    {name: "username", type: "string", required: true, unique: true},
    {name: "password", type: "string", required: true}
  ],
  statics: {
    coolUsers: async function () {
      return await this.get({})
    }
  },
  methods: {
    verifyPassword: function (user) { console.log(user) }
  },
})  

let time = Date.now()
let promises = []
for(let i = 0; i < 100; i++) {
  promises.push(
    Users.add({username: `bob${i}`, password: `123${i}`})
    .then(bob => Users.edit(bob.uuid, {username: `jim${i}`, password: `456${i}`} ))
    .then(jim => Users.delete(jim))
    .then(() => (Users.coolUsers()))
    .then(coolUsers => coolUsers.forEach(user => console.log(user.verifyPassword("Password"))))
  )
}
Promise.all(promises).then(
  () => console.log(Date.now() - time)
)

//console.log(Users._model._functions)
Users.coolUsers().then(u => console.log(u))