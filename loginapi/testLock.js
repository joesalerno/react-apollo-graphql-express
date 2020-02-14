const refresher = require("child_process").fork("refreshLock.js")
const { writeFileSync, writeFile, readFile, readFileSync, unlink, unlinkSync, mkdir, mkdirSync, rmdir, rmdirSync } = require("fs")
const { promisify } = require("util")
const writeFileAsync = promisify(writeFile)
const readFileAsync = promisify(readFile)
const mkdirAsync = promisify(mkdir)
const rmdirAsync = promisify(rmdir)
//const execAsync = promisify(exec)
//const spawnAsync = promisify(spawn)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let file = "./lock"
try { rmdirSync(`${file}.lock`)}
catch(e) {}

const lock = async file => {
  console.log("refresher.send({ add: file })")
  refresher.send({ add: file })
  console.log("locking")
  while(1) {
    try {
      mkdirSync(`${file}.lock`)
      return
    } catch {}
    //sleep(1)
  }
}

const unlock = async file => {
  console.log("refresher.send({ remove: file })")
  refresher.send({ remove: file })
  console.log("unlocking")
  while(1) {
    try {unlinkSync(`${file}.lock/keepalive`)} catch {}
    try {
      rmdirSync(`${file}.lock`)
      return
    } catch {}
    //sleep(1)
  }
}


// const loop = async () => {
//   let start = Date.now()
//   for (let i = 0; i < 500; i++) {
//     //console.log(i)
//     await lock("./lock")
//     await sleep(1)
//     await unlock("./lock")
//   }
//   console.log(Date.now()-start)
// }

// loop().then(x=>console.log(x)).then(() => refresher.kill())

module.exports = { lock, unlock }