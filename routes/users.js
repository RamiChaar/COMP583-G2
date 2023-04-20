const router = require('express').Router()
const bcrypt = require('bcrypt')

let User = require('../models/user.model')

router.route('/').get((req, res) =>  {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:email').get((req, res) =>  {
    User.find({ 'email': req.params.email })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({email, hashedPassword, salt})
        newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err))
    } catch {
        res.status(500).send()
    }
})

module.exports = router