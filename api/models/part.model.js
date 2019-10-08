const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartSchema = new Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    name: {type: Schema.Types.String, required: true},
    stepTypeIds: {type: [Schema.Types.String]},
    enabled: {type: Schema.Types.Boolean, required: true, default: true},
})

module.exports = mongoose.model('Part', PartSchema)