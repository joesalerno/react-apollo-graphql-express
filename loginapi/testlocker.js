const Locker = require("./modules/locker")

const locker = new Locker()

const sleep = ms => new Promise(done => setTimeout(done, ms))

const doConcurrent = async times => {
  const start = Date.now()
  const promises = []
  for (let i = 0; i < times; i++) {
    promises.push(cycle())
  }
  await Promise.all(promises)
  return Date.now() - start
}

const cycle = async () => {
  await locker.lock("./testlockfile")
  await locker.unlock("./testlockfile")
}

const test = async (concurrent, times) => {
  console.log(`Testing ${concurrent} requests at a time, ${times} times, with retry: ${locker.retry}`)
  for (let i = 0; i < times; i++ ){
    await doConcurrent(concurrent)
  }
}

let start = Date.now()
test(25, 100).then(() => console.log(Date.now()-start))




