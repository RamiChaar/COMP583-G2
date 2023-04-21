const router = require('express').Router()

let ShowTimeAvailability = require('../models/showTimeAvailability.model')

router.route('/:showTimeId').get(async (req, res) =>  {
    let showTimeId = req.params.showTimeId
    try{
        const showTimeAvailability = await ShowTimeAvailability.findOne({'showTimeId': showTimeId})
        if (showTimeAvailability) {
            res.send(showTimeAvailability)
        } else {
            res.send([])
        }

    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
})

router.route('/add').post(async (req, res) =>  {
    let showTimeId = req.body.showTimeId
    let seats = req.body.seats

    try{
        const showTimeAvailability = await ShowTimeAvailability.findOne({'showTimeId': showTimeId})
        if (showTimeAvailability) {
            let currTakenSeats = showTimeAvailability.takenSeats
            seats.forEach(seat => {
                currTakenSeats.push(seat)
            })
            ShowTimeAvailability.updateOne({ 'showTimeId': showTimeId }, { $set: { takenSeats: currTakenSeats }})
            .then(res.json('tickets added'))
        } else {
            let takenSeats = seats
            const newShowTimeAvailability = new ShowTimeAvailability({showTimeId, takenSeats})
            newShowTimeAvailability.save().then(res.json('tickets added'))
        }

    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router