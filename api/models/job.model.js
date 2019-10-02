const mongoose = require("mongoose")
const Schema = mongoose.Schema

const JobSchema = new Schema({
  jobNo: { type: String, lowercase: true, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  partId: { type: Schema.Types.ObjectId, ref: "Part", required: true },
  status: { 
    type: Schema.Types.String, 
    enum: ["WORKING","STOPPED","DONE"],
    required: true,
    default:"WORKING"
  },
  enabled: {type: Schema.Types.Boolean, required: true, default: true},
  timeCreated: {type: Schema.Types.Date, required: true, default: Date.now}
})

JobSchema.statics.findByIdOrNo = async function(job) {
  try { return await this.findById(job) }
  catch { return await this.findOne({ jobNo: job }) }
}

module.exports = mongoose.model("Job", JobSchema)