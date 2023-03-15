const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('debug', true);

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
