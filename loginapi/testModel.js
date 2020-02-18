// const JsModel = require("./models/JsModel")


// userIsCoolModule = user => user.username === "Joe"
// verifyPasswordModule = password => password === "Password"

// const Users = new JsModel ({ 
//   name: "Users",
//   fields: {
//     username: { type: "string", required: true, unique: true },
//     password: { type: "string", required: true }
//   },
//   // fields: [
//   //   {name: "username", type: "string", required: true, unique: true},
//   //   {name: "password", type: "string", required: true}
//   // ],
//   statics: {
//     loggedInUsers: async function () {
//       return await this.get({})
//     }
//   },
//   methods: {
//     verifyPassword: function (pass) {
//       return(this.password === pass)
//     }
//   },
// })  

const fs = require ("fs")
fs.writeFileSync("./models/User.json", "[]")

const User = require("./models/User")

// User.add({username: `bob`, password: `123`, host:"23asdf423"})
// .then(bob => User.edit(bob.uuid, {username: `jim`, password: `456`, host: 2} ))
// .then(jim => User.edit(jim.uuid, {username: `done`}))

let time = Date.now()
let promises = []
let concurrent = 400
for(let i = 0; i < concurrent; i++) {
  promises.push(
    User.add({username: `bob${i}`, password: `123${i}`, host:"23asdf423"})
    .then(bob => User.edit(bob.uuid, {username: `jim${i}`, password: `456${i}`, host: 2} ))
    .then(jim => User.edit(jim.uuid, {username: `done${i}`}))
  )
}
Promise.all(promises).then(() => {
  let newTime = Date.now() - time
  console.log(`${concurrent}: ${newTime}, (${newTime/concurrent} per test)`)
})

//User.add({username: "joe", password:"test"}).then(x => console.log(x))

//User.everyone().then(everyone => console.log(everyone))
//Users.add({username: "bob", password: "thing"}).then(x => console.log(x))
// //Users.get().then(users => console.log(users))

// Users.get().then(users => users.forEach(user => console.log(user.verifyPassword("thing"))))



//const User = require("./models/User")
// for(let i = 0; i < 1000; i++ ){
//   User.add({username: `${i}`, password:`${i}`})
// }

// User.get().then(x => console.log(x))