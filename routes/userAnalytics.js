const router = require('express').Router()
const bcrypt = require('bcrypt')

let User = require('../models/user.model')
let UserAnalytics = require('../models/userAnalytics.model')

let genreTypes = [
    "Action",
    "Drama",
    "Comedy",
    "Crime",
    "Biography",
    "History",
    "Music",
    "Documentary",
    "Horror",
    "Mystery & Thriller",
    "Fantasy",
    "Kids & Family",
    "Adventure",
    "Animation", 
    "Sci-Fi",
    "Anime"]

let ratingTypes = [
    "R",
    "PG-13",
    "PG"]

let listTypes = [
    "Popular List",
    "Newly Released List",
    "Less Known List",
    "Movies Near You List"]

let tomatoLevels = [
    'Certified Fresh',
    'Fresh',
    'Rotten']

router.route('/getAnalytics').post( async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ 'email': email })
    .then(async user => {
        if(user == null) {
            return
        } else {
            if(await bcrypt.compare(password, user.hashedPassword)) {
                if(user.isAdmin) {
                    let analyticData = []
                    let results = await UserAnalytics.find()
                    results.forEach((doc) => {
                        analyticData.push(doc)
                    })
                    res.status(200).send(analyticData)
                }
            } else {
                res.status(401).send('unauthorized, not admin')
            }
        }
    })
    .catch(err => {res.status(400).json('Error: ' + err); console.log(err)})

})

router.route('/addAnalytics').post( async (req, res) => {
    const genreSelections = req.body.genreSelections
    const ratingSelection = req.body.ratingSelection
    const listSelection = req.body.listSelection
    const tomatoLevel = req.body.tomatoLevel

    const date = new Date();
    const utcOffset = -8; // PST is UTC-8
    const pstTime = new Date(date.getTime() + (utcOffset * 60 * 60 * 1000));
    const formattedDate = pstTime.toISOString().slice(0, 10);

    UserAnalytics.findOne({ 'date': formattedDate })
    .then(async userAnalytics => {
        let newGenreSelections 
        let newRatingSelections
        let newListSelections
        let newTomatoLevels
        if(userAnalytics === null) {
            newGenreSelections = []
            newRatingSelections = []
            newListSelections = []
            newTomatoLevels = []

            genreTypes?.forEach(genre => {
                let newGenreSelection = {
                    genre: genre,
                    count: 0
                }
                newGenreSelections.push(newGenreSelection)
            })

            ratingTypes?.forEach(rating => {
                let newRatingSelection = {
                    rating: rating,
                    count: 0
                }
                newRatingSelections.push(newRatingSelection)
            })

            listTypes?.forEach(list => {
                let newListSelection = {
                    list: list,
                    count: 0
                }
                newListSelections.push(newListSelection)
            })

            tomatoLevels?.forEach(tomatoLevel => {
                let newTomatoLevel = {
                    tomatoLevel: tomatoLevel,
                    count: 0
                }
                newTomatoLevels.push(newTomatoLevel)
            })
        } else {
            newGenreSelections = userAnalytics.genreSelectionCounts
            newRatingSelections = userAnalytics.ratingSelectionCounts
            newListSelections = userAnalytics.listSelectionCounts
            newTomatoLevels = userAnalytics.tomatoLevelCounts
        }

        genreSelections?.forEach(genre => {
            if(newGenreSelections.some(oldGenre => {return oldGenre.genre === genre})) {
                newGenreSelections.find(oldGenre => {return oldGenre.genre === genre}).count += 1
            } else {
                let newGenreSelection = {
                    genre: genre,
                    count: 1
                }
                newGenreSelections.push(newGenreSelection)
            }
        })
    
        if(ratingSelection !== null && ratingSelection !== undefined) {
            if(newRatingSelections.some(oldRating => {return oldRating.rating === ratingSelection})) {
                newRatingSelections.find(oldRating => {return oldRating.rating === ratingSelection}).count += 1
            } else {
                let newRatingSelection = {
                    rating: ratingSelection,
                    count: 1
                }
                newRatingSelections.push(newRatingSelection)
            }
        }

        if(listSelection !== null && listSelection !== undefined){
            if(newListSelections.some(oldList => {return oldList.list === listSelection})) {
                newListSelections.find(oldList => {return oldList.list === listSelection}).count += 1
            } else {
                let newListSelection = {
                    list: listSelection,
                    count: 1
                }
                newListSelections.push(newListSelection)
            }
        }

        if(tomatoLevel !== null && tomatoLevel !== undefined){
            if(newTomatoLevels.some(oldTomatoLevel => {return oldTomatoLevel.tomatoLevel === tomatoLevel})) {
                newTomatoLevels.find(oldTomatoLevel => {return oldTomatoLevel.tomatoLevel === tomatoLevel}).count += 1
            } else {
                let newTomatoLevel = {
                    tomatoLevel: tomatoLevel,
                    count: 1
                }
                newTomatoLevels.push(newTomatoLevel)
            }
        }

        if(userAnalytics === null) {
            const newUserAnalytics = new UserAnalytics({ date: formattedDate, genreSelectionCounts: newGenreSelections, ratingSelectionCounts: newRatingSelections, listSelectionCounts: newListSelections, tomatoLevelCounts: newTomatoLevels })
            await newUserAnalytics.save()
        } else {
            await UserAnalytics.updateOne({ 'date': formattedDate }, { $set: { genreSelectionCounts: newGenreSelections, ratingSelectionCounts: newRatingSelections, listSelectionCounts: newListSelections, tomatoLevelCounts: newTomatoLevels }})
        }
        return res.status(200)
    })
    .catch(err => {res.status(400).json('Error: ' + err); console.log(err)})
})

module.exports = router