const router = require('express').Router()
const bcrypt = require('bcrypt')

let User = require('../models/user.model')

router.route('/:email').get((req, res) =>  {
    User.findOne({ 'email': req.params.email })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const favoriteTheaters = []
        const tickets = []
        const isAdmin = false
        const newUser = new User({email, hashedPassword, isAdmin, favoriteTheaters, tickets})
        newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err))
    } catch {
        res.status(500).send()
    }
})

router.route('/addFavorite').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const theaterId = req.body.theaterId
    const theaterName = req.body.theaterName

    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null || !await bcrypt.compare(password, user.hashedPassword)) {
            return res.status(404).send('invalid credentials')
        } 
        let favoriteTheaters = user.favoriteTheaters
        let newFavoriteTheaters = favoriteTheaters.filter(favoriteTheater => favoriteTheater.theaterId !== theaterId);
        newFavoriteTheaters.push({theaterId: theaterId, theaterName: theaterName})

        User.updateOne({ 'email': email }, { $set: { favoriteTheaters: newFavoriteTheaters }})
        .then(res.json('theater added to favorites'))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/removeFavorite').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const theaterId = req.body.theaterId

    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null || !await bcrypt.compare(password, user.hashedPassword)) {
            return res.status(404).send('invalid credentials')
        } 
        let favoriteTheaters = user.favoriteTheaters
        let newFavoriteTheaters = favoriteTheaters.filter(favoriteTheater => favoriteTheater.theaterId !== theaterId);

        User.updateOne({ 'email': email }, { $set: { favoriteTheaters: newFavoriteTheaters }})
        .then(res.json('theater removed from favorites'))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/isFavorite').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const theaterId = req.body.theaterId

    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null || !await bcrypt.compare(password, user.hashedPassword)) {
            return res.status(404).send('invalid credentials')
        } 
        if(user.favoriteTheaters.some(favoriteTheater => favoriteTheater.theaterId === theaterId)) {
            res.json({isFavorite: true})
        } else {
            res.json({isFavorite: false})
        }
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/favoriteTheaters').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log('here')
    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null || !await bcrypt.compare(password, user.hashedPassword)) {
            return res.status(404).send('invalid credentials')
        } 
        console.log()
        res.json(user.favoriteTheaters)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/login').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null) {
            return res.status(404).send('cannot find user')
        } else {
            try {
                if(await bcrypt.compare(password, user.hashedPassword)) {
                    res.send('Success')
                } else {
                    res.send('Not Allowed')
                }
            } catch {
                res.status(500).send()
            }
        }
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router