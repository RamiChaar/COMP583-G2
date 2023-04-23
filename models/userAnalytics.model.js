const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAnalyticsModel = new Schema ({
    date: {
        type: String,
        required: true
    },
    genreSelectionCounts: {
        type: Array,
        required: true
    },
    ratingSelectionCounts: {
        type: Array,
        required: true
    },
    listSelectionCounts: {
        type: Array,
        required: true
    },
})

const userAnalytics = mongoose.model('userAnalytics', userAnalyticsModel)

module.exports = userAnalytics