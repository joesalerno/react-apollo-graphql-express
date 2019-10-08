const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  name: {type: Schema.Types.String, required: true, unique: true, uppercase: true},
  stepTypes: {type: [Schema.Types.ObjectId], ref: "StepType"},
  enabled: {type: Schema.Types.Boolean, required: true, default: true }
})

LocationSchema.statics.findByIdOrName = async function(location) {
  try { return await this.findById(location) } 
  catch { return await this.findOne({name: location}) }
}

module.exports = mongoose.model('Location', LocationSchema)