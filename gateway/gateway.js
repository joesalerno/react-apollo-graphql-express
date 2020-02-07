// make etch file checker try to open file instead of ask if it exists, might force update

const { execSync } = require("child_process")
const nanoid = require("nanoid")
//env
const OUTDIR = `/gen_local/tmp`

const getGenesisInstance = job => {
  //find or open(&que death) genesis
  //return pid
}

const Info = args => {  
  const pid = getGenesisInstance(job)
  const outfile = `${pid}${nanoid()}`

  let command = `COM INFO `
  command += `-outfile ${outfile} `

  if (typeof args == "Object") {
    const {t, e, d} = args
    if (t) command += `-t ${t} `
    if (e) command += `-e ${e} `
    if (d) command += `-d ${d} `
  else if (typeof args == "String") {
    command += `${args} `
  }

  execSync(`gateway %${pid} "${command}"`)
  const result = fs.readFileSync(`${OUTDIR}/${outfile}`)

  // parse result
  //  value type -> value
  //  array of value type -> array of values
  //  multiple array of value type -> object {type:array of values}

  return result
}

const Com = (cmd) => {
  //const pid = getGenesisInstance(job)
  //execSync(`gateway "COM ${pid} "`)

  //open file
  //read file
  //delete file
  //parse response
  //return response

  return execSync(cmd)
}