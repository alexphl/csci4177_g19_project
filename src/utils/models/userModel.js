import { Schema, model, models } from "mongoose";
//mongoose.set('debug', true);

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

module.exports = models.User || model('User', userSchema)
