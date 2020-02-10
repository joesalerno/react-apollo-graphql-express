const { exec } = require ("child_process")
const { promisify } = require("util")
const execAsync = promisify(exec)

module.exports = async hostname => {
  try {
    await execAsync(`ping -n 1 ${hostname}`)
    return true
  } catch {
    return false 
  }
}