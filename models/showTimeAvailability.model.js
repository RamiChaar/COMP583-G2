const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showTimeAvailabilitySchema = new Schema ({
    showTimeId: {
        type: String,
        required: true
    },
    takenSeats: {
        type: Array,
        required: true
    }
})

const showTimeAvailability = mongoose.model('showTimeAvailability', showTimeAvailabilitySchema)

module.exports = showTimeAvailability