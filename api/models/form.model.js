const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FormSchema = new Schema({ 
  name: { type: Schema.Types.String, uppercase: true, required: true, unique: true },
  description: { type: Schema.Types.String, required: true},
  data: {
    type: [{
      instructions: { type: Schema.Types.String, required: true },
      regEx: { type: Schema.Types.String },
      validatorId: { type: Schema.Types.ObjectId, ref: "Validator" }
    }], 
    required: true
  },
  enabled: {type: Schema.Types.Boolean, required: true, default: true},
  timeCreated: {type: Schema.Types.Date, required: true, default: Date.now}
})

FormSchema.statics.findByIdOrName = async function(form) {
  try { return await this.findById(form) }
  catch { return await this.findOne({ name: form }) }
}

module.exports = mongoose.model("Form", FormSchema)