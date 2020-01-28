const net = require("net")

const sleep = ms => new Promise (done => setTimeout(done, ms))

class Genesis {
  constructor(port, host) {
    this.port = port || 1337
    this.host = host || "localhost"
    this.data = []
    this._init()
  }

  async _init () {
    await this._connect()
    var msg = await this._in()
    console.log(`Received: [${msg}]`)
    this._out("#INIT#")
    msg = await this._in()
    console.log(`Received: [${msg}]`)
    this.initialized = true
    console.log("done")
  }

  async _connect () {
    console.log("Connecting to server...")
    this.client = new net.Socket()
    this.client.on("data", data => this.data.push(data.toString()))
    this.client.on("error", () => this.client.end())
    this.client.on("close", () => {this.connected = false; this._connect()})
    await this.client.connect(this.port, this.host, () => {this.connected = true; console.log("Connected")})  
  }

  async _out (message) {
    while(!this.initialized && !this.connected) {await sleep(1)} //BLOCKS!
    await this.client.write(message)
  }

  async _in () {
    while(!this.data.length) {await sleep(1)} //BLOCKS!
    return this.data.shift().toString()
  }

  async COM () {
    this._out("COM MESSAGE")
    .then(() => this._in())
    .then(msg => console.log(`received message: ${msg}`))
  }
}

module.exports = Genesis

// const net = require("net")
// var client = new net.Socket()

// var connected = false
// var tryingToConnect = false
// var initialized = false
// var d = []

// // const connect = () => {
// //   console.log("Connecting to server...")
// //   connected = false
// //   client = new net.Socket()
// //   client.on("data", (data) => d.push(data))
// //   client.on("error", () => client.end())
// //   client.on("close", () => connect())
// //   client.connect(1337, () => {connected = true; console.log("Connected")})
// // }

// const connect = () => {
//   console.log("Connecting to server...")
//   return new Promise((resolve, reject)=>{
//     connected = false
//     client = new net.Socket()
//     client.on("data", (data) => d.push(data))
//     client.on("error", () => client.end())
//     client.on("close", () => reject(connected = false))
//     client.connect(1337, socket => {connected = true; resolve(socket)})
//   })
// }

// const initConnection = async () => {
//   while (!connected) {
//     tryingToConnect = true
//     try{ var socket = await connect() } catch{}
//   }
//   socket.removeAllListeners()
//   socket.on("data", (data) => d.push(data))
//   socket.on("error", () => socket.end())
//   socket.on("close", () => initConnection())
// }

// //initConnection().then(()=>console.log("after"))

// const loop = async () => {
//   while (1) {
//     if (!connected && !tryingToConnect) {
//       await initConnection()
//       console.log("-")
//     }
//   }
// }

// while(1){
//   loop().then(()=>{() => console.log("looped")})
// }


// //connect().then(() => console.log(connected)).catch(() => console.log(connected))

// //console.log("After")

// //if (!connected) connect().then(() => console.log(connected)).catch(() => console.log(connected))

// // Works:
// // const connect = () => {
// //   console.log("Connecting to server...")
// //   return new Promise((resolve, reject)=>{
// //     connected = false
// //     client = new net.Socket()
// //     client.on("data", (data) => d.push(data))
// //     client.on("error", () => client.end())
// //     client.on("close", () => reject(connected = false))
// //     client.connect(1337, () => resolve(connected = true))
// //   })
// // }
// // connect().then(() => console.log(connected)).catch(() => console.log(connected))


// // const connect = () => {
// //   console.log("Connecting to server...")
// //   return new Promise((resolve, reject)=>{
// //     connected = false
// //     client = new net.Socket()
// //     client.on("data", (data) => d.push(data))
// //     client.on("error", () => {})
// //     client.on("close", () => {return connect()})
// //     client.connect(1337, () => resolve((connected=true)))
// //   })
// // }

// // const getData = () => {
// //   return new Promise((resolve, reject)=>{
// //     if (!d.length) return setTimeout(getData(),1000)
// //     else resolve(d.shift())
// //   })
// // }

// // const reconnect = () => {
// //   return new Promise((resolve, reject)=>{
// //     console.log("here 1")
// //     connect()
// //     .then(()=>{if (!connected) setTimeout(() => {
// //       console.log("here 4")
// //       if (!connected) return reconnect()
// //       else resolve()
// //       console.log("here 5")
// //     }, 2000)})
// //     console.log("here 6")
// //   })
// // }

// // const wait = () => {
// //   return new Promise((resolve, reject)=>{
// //     if (!connected) setTimeout(() => {wait()}, 1000)
// //     else resolve()
// //   })
// // }

// // reconnect().then(()=>console.log("then")).catch(()=>console.log("error"))
// // console.log(`connected instantly: ${connected}`)
// // wait().then(()=>console.log(connected))
// // setTimeout(() => {()=>console.log(connected)}, 1000)


 






// // const net = require("net")
// // var client = new net.Socket()
// // var connected = false
// // var initialized = false
// // const connect = () => {
// //   return new Promise((resolve)=>{
// //     console.log("here 2")
// //     client = new net.Socket()
// //     client.on("error", ()=>{})
// //     client.on("close", ()=> {
// //       console.log("Connection closed")
// //       connected = false
// //       resolve()
// //     })
// //     client.connect(1337, "127.0.0.1", (sock) => {
// //       console.log("Connected")
// //       console.log(sock)
// //       initialized = true
// //       connected = true
// //       resolve()
// //     })
// //     console.log("here 3")
// //   })
// // }

// // const reconnect = () => {
// //   console.log("here 1")
// //   connect()
// //   .then(()=>{if (!connected) setTimeout(() => {
// //     console.log("here 4")
// //     if (!connected) reconnect()
// //     console.log("here 5")
// //   }, 2000)})
// //   console.log("here 6")
// // }

// // reconnect()
// // console.log("after reconnect")