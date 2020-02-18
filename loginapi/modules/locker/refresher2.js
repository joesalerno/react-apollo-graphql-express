const { writeFileSync, unlinkSync, statSync, rmdirSync, existsSync } = require("fs")

let KEEPALIVE_MS = 2000
let TIMEOUT_MS = 5000

let lockfiles = {}

process.on("message", ({ add, remove, timeout, keepalive }) => {
  if (add) lockfiles[add] = true
  if (remove) lockfiles = delete lockfiles[remove]
  if (timeout) TIMEOUT_MS = timeout
  if (keepalive) KEEPALIVE_MS = keepalive
})

const refreshLocks = () => {
  console.log(`Refreshing`)
  console.log(lockfiles)
  for (const file of Object.keys(lockfiles)) {
  console.log(existsSync(`${file}.lock`))
    //console.log(`Checking: ${file}`)
    // try {
    //   //console.log(`Timeout: ${TIMEOUT_MS}`)
    //   //console.log(Date.now() - statSync(`${file}.lock`).mtimeMs)
    //   if (Date.now()-statSync(`${file}.lock`).mtimeMs > TIMEOUT_MS) {
    //     //console.log(Date.now()-statSync(`${file}.lock`).mtimeMs)
    //     console.log("GOT STALE!")
    //     //console.log(TIMEOUT_MS)
    //     try {unlinkSync(`${file}.lock/keepalive`)} catch(e){console.log(e)}
    //     while(existsSync(`${file}.lock`)){
    //       try {
    //         rmdirSync(`${file}.lock`)
    //         console.log("DELETE STALE SUCCESSFUL")
    //       } catch(e){console.log(e)}
    //     }
    //   }
    // } catch{}
    try { writeFileSync(`${file}.lock/keepalive`) } catch{}
    try { unlinkSync(`${file}.lock/keepalive`) } catch{}
  }
  setTimeout(refreshLocks, KEEPALIVE_MS)
}

setTimeout(refreshLocks, 50)
//setInterval(refreshLocks, KEEPALIVE_MS)