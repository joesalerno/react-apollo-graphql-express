const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ValidatorSchema = new Schema({
  moduleName: { type: Schema.Types.String, uppercase: true, required: true, unique: true },
  description: { type: Schema.Types.String, required: true },
  enabled: {type: Schema.Types.Boolean, required: true, default: true},
  timeCreated: {type: Schema.Types.Date, required: true, default: Date.now},
})

ValidatorSchema.methods.execute = function(userInput) {
    try {
      const validator = require(`../validators/${this.moduleName}`)
      return validator(userInput)
    } catch (e) {
      console.log(`Error with validator ${this.moduleName} on input [${userInput}]`)
      return false
    }
}

ValidatorSchema.statics.findByIdOrName = async function(validator) {
  try { return await this.findById(validator) }
  catch { return await this.findOne({ moduleName: validator }) }
}

module.exports = mongoose.model("Validator", ValidatorSchema)