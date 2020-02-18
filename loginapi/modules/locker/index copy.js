const { unlinkSync, mkdirSync, rmdirSync, statSync, existsSync } = require("fs")
const { fork } = require("child_process")
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const forkRefresher = ({ keepalive, timeout}) => {
  const refresher = fork(`${__dirname}/refresher.js`)
  if (keepalive) refresher.send({keepalive})
  if (timeout) refresher.send(timeout)
  return refresher
}

deleteStaleLock = (file, timeout) => {
  try {
    console.log(Date.now()-statSync(`${file}.lock`).mtimeMs)
    if (Date.now()-statSync(`${file}.lock`).mtimeMs > timeout) {
      try {unlinkSync(`${file}.lock/keepalive`)} catch(e){console.log(e)}
      while(existsSync(`${file}.lock`)){
        try {
          rmdirSync(`${file}.lock`)
          console.log("DELETE STALE SUCCESSFUL")
        } catch(e){console.log(e)}
      }
    }
  } catch(e){console.log(e)}
}

module.exports = class Locker { constructor({ keepalive, timeout, retry, attempts } = {}) {
    ///////////////////////////////////// Options:
    this.keepalive = keepalive || 2000 // ms to check freshness and update keepalive, to protect stale locks
    this.timeout   = timeout   || 6000 // ms before lock is considered stale
    this.retry     = retry     || 1    // ms before re-trying after unsuccessful lock
    this.attempts  = attempts  || 0    // number of failed attempts before error is thrown (resets on success)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.lockCount = 0 // starts/stops refresher daemon. program won't close with lock open ~ this is a plus
    this.failedAttempts = {} // throws error when attempts[filename] === failedAttempts
  }

  async lock (filename) {
    //console.log("locking")
    //console.log("1")
    deleteStaleLock(filename, this.timeout)
    if ((this.lockCount += 1) === 1) this.refresher = forkRefresher({keepalive: this.keepalive, timeout: this.timeout})
    //console.log("2")
    this.refresher.send({ add: filename })
    console.log("3")
    while(1) {
      try {

        //console.log(`befr mkdir:${filename}.lock `)
        //while (1){
          if (!existsSync(`${filename}.lock`)){
            mkdirSync(`${filename}.lock`)
            if (this.failedAttempts[filename]) delete this.failedAttempts[filename]    
console.log("locked")
            return this.lockCount
          }
          //await sleep(this.retry)
        //}
        
        //console.log("after mkdir")
        //if (this.failedAttempts[filename]) delete this.failedAttempts[filename]
        //return this.lockCount
      } catch {}
      if (this.attempts) {
        if (!this.failedAttempts[filename]) this.failedAttempts[filename] = 1
        else this.failedAttempts[filename]++
        if (this.attempts === this.failedAttempts[filename]) throw Error( `Maximum attempts (${this.attempts}) reached` )
      }
      await sleep(this.retry)
    }
  }

  async unlock (filename) {
    this.lockCount--
    if (!this.lockCount) this.refresher.kill()
    else this.refresher.send({ remove: filename })
    while(1) {
      try {unlinkSync(`${filename}.lock/keepalive`)} catch {}
      try {
        rmdirSync(`${filename}.lock`)
        if (this.failedAttempts[filename]) delete this.failedAttempts[filename]
console.log("unlocked")
        return this.lockCount
      } catch {}
      if (this.attempts) {
        if (!this.failedAttempts[filename]) this.failedAttempts[filename] = 1
        else this.failedAttempts[filename]++
        if (this.attempts === this.failedAttempts[filename]) throw Error( `Maximum attempts (${this.attempts}) reached` )
      }
      await sleep(this.retry)
    }
  }
}