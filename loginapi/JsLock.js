const { unlinkSync, mkdirSync, rmdirSync } = require("fs")
const { fork } = require("child_process")
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const forkRefresher = async({keepalive, timeout, retry}) => {
  const refresher = fork("./refreshLock")
  if (keepalive) this.refresher.send({keepalive})
  if (retry) this.refresher.send(retry)
  if (timeout) this.refresher.send(timeout)
  return refresher
}

module.exports = class Locker {
  constructor({keepalive, timeout}) {
    this.count     = 0 //starts/stops refresher daemon -- program won't close with lock open -- this is a plus~
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.keepalive = keepalive || 2000 //ms to check freshness and update keepalive, to protect stale locks
    this.timeout   = timeout   || 10000 //ms before file is considered stale
    this.retry     = retry     || 0 //time before checking if locked file can be locked
  }

  async lock (file) {
    if (!this.count) this.refresher = forkRefresher({keepalive: this.keepalive, timeout: this.timeout})
    this.count++
    refresher.send({ add: file })
    while(1) {
      try {
        mkdirSync(`${file}.lock`)
        return this.count
      } catch {}
      sleep(retry)
    }
  }

  async unlock (file) {
    if (!this.count--) this.refresher.kill()
    else this.refresher.send({ remove: file })
    while(1) {
      try {unlinkSync(`${file}.lock/keepalive`)} catch {}
      try {
        rmdirSync(`${file}.lock`)
        return
      } catch {}
      sleep(retry)
    }
  }
}





let file = "./lock"
try { rmdirSync(`${file}.lock`)}
catch(e) {}

const lock = async file => {
  refresher.send({ add: file })
  while(1) {
    try {
      mkdirSync(`${file}.lock`)
      return
    } catch {}
    //sleep(1)
  }
}

const unlock = async file => {
  refresher.send({ remove: file })
  //console.log("unlocking")
  while(1) {
    try {unlinkSync(`${file}.lock/keepalive`)} catch {}
    try {
      rmdirSync(`${file}.lock`)
      return
    } catch {}
    //sleep(1)
  }
}

const loop = async () => {
  let start = Date.now()
  for (let i = 0; i < 500; i++) {
    //console.log(i)
    await lock("./lock")
    await sleep(1)
    await unlock("./lock")
  }
  console.log(Date.now()-start)
}

loop().then(x=>console.log(x)).then(() => )