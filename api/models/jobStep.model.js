const mongoose = require("mongoose")
const Schema = mongoose.Schema
const StepType = require("./stepType.model")

const JobStepSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  stepTypeId: { type: Schema.Types.ObjectId, ref: "StepType", required: true },
  prevStepIds: { type: [Schema.Types.ObjectId], ref: "JobStep" },
  completed: { type: Schema.Types.Boolean, required: true, default: false },
  completedById: { type: Schema.Types.ObjectId, ref: "User" },
  timeCompleted: { type: Schema.Types.Date },
  formData: { type: [Schema.Types.String] },
  enabled: { type: Schema.Types.Boolean, required: true, default: true },
})

JobStepSchema.virtual("timeCreated").get(function() { return this._id.getTimestamp() })

JobStepSchema.methods.prevStepsCompleted = async function() {
  for (var prevStep of await this.model("JobStep").find({ _id: { $in: this.prevStepIds } }))
    if (!prevStep.completed && prevStep.enabled) {
      const prevStepType = await StepType.findById(prevStep.stepTypeId)
      if (prevStepType.enabled) return false
    }
  return true
}

module.exports = mongoose.model("JobStep", JobStepSchema)
