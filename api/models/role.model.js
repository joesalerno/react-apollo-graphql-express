const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: { type: Schema.Types.String, uppercase: true, required: true, unique: true, },
  userIds: { type: [Schema.Types.ObjectId], ref: "User", required: true },
})

RoleSchema.virtual("timeCreated").get(function() { return this._id.getTimestamp() })

RoleSchema.statics.findByIdOrName = async function(role) {
  try { return await this.findById(role) } 
  catch { return await this.findOne({name: role}) }
}

module.exports = mongoose.model("Role", RoleSchema)