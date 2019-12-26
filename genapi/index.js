const { Forms } = require("./models")
const schema = require("./schema.json")
const job = "joe_ab"

//Check connection
const exists = `perl geninfo job ${job} exists`
if (exists.match(/connect/)) throw Error ("Unable to connect to Genesis")
if (!exists.match(/yes/)) throw Error ("Unable to find job")

//Get lists
const flows_list = `perl geninfo job ${job} flows_list`
const forms_list = `perl geninfo job ${job} forms_list`
const matrix_list = `perl geninfo job ${job} matrix_list`
const stackups_list = `perl geninfo job ${job} stackups_list`
const steps_list = `perl geninfo job ${job} steps_list`
const symbols_list = `perl geninfo job ${job} symbols_list`
const templates_list = `perl geninfo job ${job} templates_list`
const wheels_list = `perl geninfo job ${job} wheels_list`

const layers_lists = []
for (const step of steps_list) {
  layers_lists.push(`perl geninfo step ${step} layers_list`)
}

const ncsets_lists = []
const aoisets_lists = []
const ncrsets_lists = []
for (const layers_list of layers_lists){
  for (const layer of layers_list){
    ncsets_lists.push(`perl geninfo layer ${layer} ncsets_list`)
    aoisets_lists.push(`perl geninfo layer ${layer} aoisets_lists`)
    ncrsets_lists.push(`perl geninfo layer ${layer} ncrsets_lists`)
  }
}

//get entities for queries

schema.job.entities = [job]
schema.flow.entities = [flows_list]
schema.form.entities = [forms_list]
schema.matrix.entities = [matrix_list]
schema.stackup.entities = [stackups_list]
//.. etc


//Query everything
for (const entityType of Object.keys(schema)) {
  if (entityType == "root") continue

  //for (const entity of schema[entityType].entities) {

    for (const dataType of Object.keys(schema[entityType])) {
      if (dataType.match(/list/i)) continue
      if (schema[entityType][dataType].format != "array") continue
      console.log(`${entityType} ${dataType} ${schema[entityType][dataType].format}`)

      
    }

  //}
}




//
for (const flow of flows_list) {
  //... query what
}
for (const form of forms_list) {
  //... query what
}
for (const matrix of matrix_list) {
  // query each matrix.? theres more than 1? what does matrix_list return
}
for (const stackup of stackups_list) {}
for (const step of steps_list) {
  var datum = `perl geninfo step ${step} datum`
}
for (const symbol of symbols_list) {}
for (const template of templates_list) {}
for (const wheel of wheels_list) {}
for (const layers_list of layers_lists) {}
for (const ncsets_list of ncsets_lists) {}
for (const aoisets_list of aoisets_lists) {}
for (const ncrsets_list of ncrsets_lists) {}