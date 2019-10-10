const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const salt_work_factor = 12

const UserSchema = new Schema({
  username: { type: Schema.Types.String, required: true, unique: true},
  employeeId: { type: Schema.Types.String, required: true, unique: true },
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true },
  enabled: { type: Schema.Types.Boolean, required: true, default: true },
})

UserSchema.virtual("timeCreated").get(function() { return this._id.getTimestamp() })

UserSchema.pre("save", async function(done) {
  if (!this.isModified("password")) return done()
  try {
    const salt = await bcrypt.genSalt(salt_work_factor)
    this.password = await bcrypt.hash(this.password, salt)
    return done()
  } catch (err) {
    return done(err)
  }
})

UserSchema.methods.verifyPassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return done(err)
    done(null, isMatch)
  })
}

UserSchema.statics.findByIdOrName = async function(user) {
  try {
    return await this.findById(user)
  } catch {
    return await this.findOne({ username: user })
  }
}

module.exports = mongoose.model("User", UserSchema)
