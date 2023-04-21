const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {})
const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
    console.log("Database name:", connection.db.databaseName);
})

const usersRouter = require('./routes/users')
const showTimeAvailabilityRouter = require('./routes/showTimeAvailability')

app.use('/users', usersRouter)
app.use('/showTimeAvailability', showTimeAvailabilityRouter)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})