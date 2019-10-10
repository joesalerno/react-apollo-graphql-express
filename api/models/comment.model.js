const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    subjectId: {type: Schema.Types.ObjectId, required:true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    data: {type: Schema.Types.String, required: true},
    edits: {type: [Schema.Types.String]},
    editTimes: {type: [Schema.Types.Date]},
    enabled: {type: Schema.Types.Boolean, required: true, default: true},
})

CommentSchema.virtual("timeCreated").get(function() { return this._id.getTimestamp() })

module.exports = mongoose.model('Comment', CommentSchema)