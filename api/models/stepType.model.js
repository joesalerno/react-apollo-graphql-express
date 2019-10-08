const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StepTypeSchema = new Schema({
    name: {type: Schema.Types.String, uppercase: true, required: true, unique: true},
    requiredRoleIds: {type: [Schema.Types.ObjectId], ref: "Role"},
    description: {type: Schema.Types.String, required: true},
    instructions: {type: Schema.Types.String, required: true},
    formId: {type: Schema.Types.ObjectId, ref: "InputDataType" },
    enabled: {type: Schema.Types.Boolean, required: true, default: true},
})

StepTypeSchema.statics.findByIdOrName = async function(stepType) {
    try { return await this.findById(stepType) } 
    catch { return await this.findOne({ name: stepType }) }
}

module.exports = mongoose.model('StepType', StepTypeSchema)