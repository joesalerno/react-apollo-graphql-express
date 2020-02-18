const { utimesSync } = require("fs")

let KEEPALIVE_MS = 2000

let lockfiles = {}

process.on("message", ({ add, remove, keepalive }) => {
  if (add) lockfiles[add] = true
  if (remove) lockfiles = delete lockfiles[remove]
  if (keepalive) KEEPALIVE_MS = keepalive
})

const refreshLocks = () => {
  for (const file of Object.keys(lockfiles)) {
    let time = Date.now()
    try { utimesSync(`${file}.lock`, time, time) }
    catch {}
  }
  setTimeout(refreshLocks, KEEPALIVE_MS)
}

setTimeout(refreshLocks, 50)