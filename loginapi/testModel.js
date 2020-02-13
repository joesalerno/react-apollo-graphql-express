const JsModel = require("./models/JsModel")
const fs = require ("fs")

//fs.writeFileSync("./models/Users.json", "[]")

userIsCoolModule = user => user.username === "Joe"
verifyPasswordModule = password => password === "Password"

const Users = new JsModel ({ 
  name: "Users",
  fields: [
    {name: "username", type: "string", required: true, unique: true},
    {name: "password", type: "string", required: true}
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

let time = Date.now()
// let promises = []
// for(let i = 0; i < 1; i++) {
//   promises.push(
//     Users.add({username: `bob${i}`, password: `123${i}`})
//     .then(bob => Users.edit(bob.uuid, {username: `jim${i}`, password: `456${i}`} ))
//     .then(jim => Users.delete(jim))
//     .then(() => (Users.coolUsers()))
//     .then(coolUsers => coolUsers.forEach(user => {console.log(user.verifyPassword("hey", "thing"))}))
//   )
// }
// Promise.all(promises).then(
//   () => console.log(Date.now() - time)
// )
//Users.add({username: "bob", password: "thing"}).then(x => console.log(x))
//Users.get().then(users => console.log(users))

Users.get().then(users => users.forEach(user => console.log(user.verifyPassword("thing"))))