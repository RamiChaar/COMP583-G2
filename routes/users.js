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
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, hashedPassword, salt})
        newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err))
    } catch {
        res.status(500).send()
    }
})

router.route('/login').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = User.find( user => user.email === email)

    if(user == null) {
        return res.status(400).send('cannot find user')
    }


    try {
        if(await bcrypt.compare(password, user.salt + user.hashedPassword)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

module.exports = router