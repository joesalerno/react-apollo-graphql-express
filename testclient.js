const net = require("net")

const sleep = ms => new Promise (done => setTimeout(done, ms))

module.exports = class Genesis {
  constructor(port, host) {
    this.port = port || 1337
    this.host = host || "localhost"
    this.data = []
    this.stringbuffer = ""
    this.connected = false
    this.initialized = false
    this._init()
  }

  async _init () {
    console.log("Connecting to server...")
    this._connect()
    await this._in(1)
    await this._out("#INIT#")
    await this._in(1)
    this.initialized = true
    console.log("Initialized")
  }

  _connect () {
    this.client = new net.Socket()
    this.client.on("data", buffer => this.data.push(buffer))
    this.client.on("error", () => this.client.end())
    this.client.on("close", () => {
      if (this.connected) console.log("Connection to server lost, reconnecting...")
      this.connected = false
      this._connect()
    })
    this.client.connect(this.port, this.host, () => { this.connected = true; console.log("Connected") })  
  }
  
  async _in ( count ) {
    let responses = []
    while (count) {
      while (!this.data.length) await sleep(1) //BLOCKS! Waits forever for correct number of formatted responses
      this.stringbuffer += this.data.shift().toString()
      let inStrings = this.stringbuffer.split( /@#🚀#@/ )
      this.stringbuffer = inStrings[inStrings.length-1]
      if (this.stringbuffer == "") inStrings.pop()
      responses.push( ...inStrings )
      if (responses.length >= count) return responses
    }
  }

  async _out ( message ) {
    this.data = [] //should be empty, preempt desync
    while (!this.connected) await sleep(1) //BLOCKS! Wait for connected
    this.client.write(message)
  }

  async _processCommand ( command, replyCount ) {
    while (this.processing || !this.initialized) await sleep(1) //BLOCKS! Only 1 at a time, after init
    this.processing = true
    await this._out(command)
    const input = await this._in(replyCount)
    this.processing = false
    return input
  }
  
  async COM () { return (await this._processCommand( "%COM%", 1 ))[0] }
  
  async DO () { return (await this._processCommand( "%DO%", 1 ))[0] }
}