const Mongoose = require('mongoose');

const BoardSchema = Mongoose.Schema({
    text: String,
    created_on: Date,
    bumped_on: Date,
    reported: Boolean,
    delete_password: String,
    replies: Array,
})

module.exports = Mongoose.model('Board', BoardSchema);