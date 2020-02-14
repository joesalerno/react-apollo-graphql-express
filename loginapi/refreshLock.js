const { writeFileSync, unlinkSync, statSync, rmdirSync } = require("fs")




let lockfiles = []
let toggle = false

let REFRESH_MS = 2000
let TIMEOUT_MS = 10000

process.on("message", (command) => {
  if (command.add) {
    lockfiles.push(command.add)
    refreshLocks()
  }
  if (command.remove) lockfiles = lockfiles.filter(file => file !== command.remove)
})

const refreshLocks = () => {
  for (const file of lockfiles) {
    try {
      if (Date.now()-statSync(`${file}.lock`).mtimeMs > TIMEOUT_MS) {
        try {unlinkSync(`${file}.lock/keepalive`)} catch{}
        try {rmdirSync(`${file}.lock`)} catch{}
      }
    } catch{}
    
    if (toggle = !toggle) for(const file of lockfiles) try { writeFileSync(`${file}.lock/keepalive`) } catch{}
    else for(const file of lockfiles) try { unlinkSync(`${file}.lock/keepalive`) } catch{}
  }
}

setInterval(() => { refreshLocks() }, REFRESH_MS)