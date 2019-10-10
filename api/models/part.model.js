const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartSchema = new Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    name: {type: Schema.Types.String, required: true},
    enabled: {type: Schema.Types.Boolean, required: true, default: true},
})

PartSchema.virtual("timeCreated").get(function() { return this._id.getTimestamp() })

module.exports = mongoose.model('Part', PartSchema)