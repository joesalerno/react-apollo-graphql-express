const { mkdir, rmdir, stat, mkdirSync, rmdirSync, statSync } = require("fs")
const { promisify } = require("util")
const mkdirAsync = promisify(mkdir)
const rmdirAsync = promisify(rmdir)
const statAsync = promisify(stat)
const { fork } = require("child_process")
const sleep = ms => new Promise(done => setTimeout(done, ms))

const forkRefresher = ({keepalive}) => {
  const refresher = fork(`${__dirname}/refresher.js`)
  if (keepalive) refresher.send({keepalive})
  return refresher
}

const deleteStaleLock = async (file, timeout) => {
  if (!timeout || timeout <= 0) return
  try {
    const mtime = (await statAsync(`${file}.lock`)).mtimeMs
    if (Date.now() - mtime > timeout) await rmdirAsync(`${file}.lock`)
  } catch {}
}

module.exports = class Locker { constructor({ keepalive, timeout, retry, attempts } = {}) {
  ///////////////////////////////////// Options:
  this.keepalive = keepalive || 1000 // ms to update mtime, to protect stale locks
  this.timeout   = timeout   || 2000 // ms before lock is considered stale
  this.retry     = retry     || 35    // ms before re-trying after unsuccessful lock
  this.attempts  = attempts  || 0    // number of failed attempts before error is thrown (resets on success)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  this.lockCount = 0 // starts/stops refresher daemon. program won't close with lock open ~ this is a plus
  this.failedAttempts = {} // throws error when failedAttempts[file] === attempts, resets on success
  }

  async lock (file) {
    await deleteStaleLock(file, this.timeout)
    while(1) {
      try {
        await mkdirAsync(`${file}.lock`)
        if (this.failedAttempts[file]) delete this.failedAttempts[file]    
        this.lockCount++
        if (this.lockCount === 1) this.refresher = forkRefresher({keepalive: this.keepalive})
        this.refresher.send({ add: file, keepalive: this.keepalive })
        return this.lockCount
      } catch {}
      if (this.attempts) {
        if (!this.failedAttempts[file]) this.failedAttempts[file] = 1
        else this.failedAttempts[file]++
        if (this.attempts === this.failedAttempts[file]) throw Error( `Maximum lock attempts (${this.attempts}) reached` )
      }
      await sleep(this.retry)
    }
  }

  async unlock (file) {
    await rmdirAsync(`${file}.lock`)
    if (this.failedAttempts[file]) delete this.failedAttempts[file]    
    this.lockCount -= 1
    if (!this.lockCount) this.refresher.kill()
    else this.refresher.send({ remove: file })
    return this.lockCount
  }
}