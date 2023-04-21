const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    favoriteTheaters: {
        type: Array,
        required: true
    },
    tickets: {
        type: Array,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User