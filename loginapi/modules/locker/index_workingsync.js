const { mkdirSync, rmdirSync, statSync } = require("fs")
const { promisify } = require("util")
// const unlinkAsync = promisify(unlink)
// const mkdirAsync = promisify(mkdir)
// const rmdirAsync = promisify(rmdir)
// const statAsync = promisify(stat)
const { fork } = require("child_process")
const sleep = ms => new Promise(done => setTimeout(done, ms))

const forkRefresher = ({keepalive, timeout}) => {
  //console.log("FORKING REFRESHER")
  const refresher = fork(`${__dirname}/refresher.js`)
  if (keepalive) refresher.send({keepalive})
  return refresher
}

const deleteStaleLock = (file, timeout) => {
  try {
    const mtime = statSync(`${file}.lock`).mtimeMs
    if (Date.now() - mtime > timeout) {
      rmdirSync(`${file}.lock`)
    }
  }catch{}
}

// const deleteStaleLock = async (file, timeout) => {
//   try {
//     const mtime = (await statAsync(`${file}.lock`)).mtimeMs
//     if (Date.now() - mtime > timeout) {
//       console.log("GOT STALE!")
//       try {
//         const err = await rmdirAsync(`${file}.lock`)
//         //console.log(err)
//         //if (err) console.log(err)
//       } catch(e) {
//         //console.log(e)
//       }
//       //}catch(err){console.log(err)}
//     }
//     console.log("Done")
//   } catch {

//   }
// 

module.exports = class Locker { constructor({ keepalive, timeout, retry, attempts } = {}) {
  ///////////////////////////////////// Options:
  this.keepalive = keepalive || 2000 // ms to check freshness and update keepalive, to protect stale locks
  this.timeout   = timeout   || 6000 // ms before lock is considered stale
  this.retry     = retry     || 1    // ms before re-trying after unsuccessful lock
  this.attempts  = attempts  || 0    // number of failed attempts before error is thrown (resets on success)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  this.lockCount = 0 // starts/stops refresher daemon. program won't close with lock open ~ this is a plus
  this.failedAttempts = {} // throws error when attempts[file] === failedAttempts
  }

  async lock (file) {
    deleteStaleLock(file, this.timeout)
    while(1) {
      try {
        mkdirSync(`${file}.lock`)
        //console.log("locked")
        if (this.failedAttempts[file]) delete this.failedAttempts[file]    
        this.lockCount++
        if (this.lockCount === 1) this.refresher = forkRefresher({keepalive: this.keepalive, timeout: this.timeout})
        this.refresher.send({ add: file })
        //console.log(this.lockCount)
        return this.lockCount
      }catch{}
      if (this.attempts) {
        if (!this.failedAttempts[file]) this.failedAttempts[file] = 1
        else this.failedAttempts[file]++
        if (this.attempts === this.failedAttempts[file]) throw Error( `Maximum attempts (${this.attempts}) reached` )
      }
      await sleep(this.retry)
    }
  }

  async unlock (file) {
    //while(1) {
      //console.log("unlocking")
      rmdirSync(`${file}.lock`)
      //console.log("unlocked")
      this.lockCount -= 1
      if (!this.lockCount) this.refresher.kill()
      return this.lockCount

//       let err = await rmdirSync(`${file}.lock`)
//       if (!err) {
// //console.log("unlocked")        
//         if (this.failedAttempts[file]) delete this.failedAttempts[file]    
//         this.lockCount -= 1
//         if (!this.lockCount) {
//           //console.log("KILLING REFRESHER")
//           //console.log(this.refresher.killed)
//           this.refresher.kill()
//         }
//         else this.refresher.send({ remove: file })
//         //console.log(`Sub Count: ${this.lockCount}`)
//         return this.lockCount
//       }
//       await sleep(this.retry)
//     //}
  }

}