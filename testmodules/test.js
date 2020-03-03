const fs = require ("fs")
fs.writeFileSync("./data/User.json", "[]")

const User = require("./models/User")

const timeCreated = user => parseInt(user._id.slice(0, 8), 36)

let time = Date.now()
let promises = []
let concurrent = 10
for(let i = 0; i < concurrent; i++) {
  promises.push(
    User.add({username: `bob${i}`, password: `123${i}`, host:"23asdf423"})
    .then(bob => User.edit(bob._id, {username: `jim${i}`, password: `456${i}`, host: 2} ))
    .then(jim => User.edit(jim._id, {username: `done${i}`}))
  )
}
Promise.all(promises).then(() => {
  let newTime = Date.now() - time
  console.log({test: "JsonModel", concurrent, time: newTime, avg: newTime/concurrent})
  User.get({}).then(x => {
    //console.log( `Found ${x.length} users` )
    for (let i = 0; i < concurrent; i++) {
      if (!x.some(y => y.username === `done${i}` )) throw Error("Error running test: user not found")
    }
    if (timeCreated(x[x.length-1]) < time) throw Error("Error running test: new user not created")
    //console.log("New users created and edited")
  })
  .then(() => {
    User.getOne({username: "done9"}).then(user => {
      user.verifyPassword("1239")
      .then(valid => {if (valid) throw Error( `Error running test: bad password 1239 passed against ${user.password}` )})
      //.then(() => console.log("Bad password rejected"))
      .then(() => user.verifyPassword("4569"))
      .then(valid => {if (!valid) throw Error( `Error running test: good password 4569 failed against ${user.password}` )})
      //.then(() => console.log("Good password confirmed"))
      .then(() => {if (user.password === "4569") throw Error( `Error running test: password 4569 matched plaintext in database` )})
      //.then(() => console.log("Password encrypted"))
      .then(() => console.log( "All tests passed" ))
    })
  })
})