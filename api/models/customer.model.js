const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {type: String, required: true, unique: true, uppercase: true},
    enabled: {type: Schema.Types.Boolean, required: true, default: true},
})

CustomerSchema.statics.findByIdOrName = async function(customer) {
    try { return await this.findById(customer) } 
    catch { return await this.findOne({name: customer}) }
}

module.exports = mongoose.model('Customer', CustomerSchema)