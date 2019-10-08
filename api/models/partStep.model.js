const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PartStepSchema = new Schema({
  name: {type: Schema.Types.ObjectId, ref: "Name", required: true},
  partId: {type: Schema.Types.ObjectId, ref: "Part", required: true},
  stepTypeId: { type: Schema.Types.ObjectId, ref: "StepType", required: true },
  prevStepIds: { type: [Schema.Types.ObjectId], ref: "PartStep" },
  enabled: { type: Schema.Types.Boolean, required: true, default: true },
})

module.exports = mongoose.model("PartStep", PartStepSchema)