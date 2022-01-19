const router = require('express').Router()
const User = require('../models/Users');
const isAuthorized = require('../config/checker').isAuthorized
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/phone', (req, res) => {
    res.send("<h1>Please open the site on your phone's browser or using dev tools and refresh.</h1>")
})

router.get('/profile', isAuthorized,(req,res)=>{
    User.findOne({_id: req.session.user}, (err, user) => {
        if(err) return console.log(err)
        res.render('profile',{user})
    })
})

router.get('/leaderboard', isAuthorized,(req,res)=>{
    User.find({}).sort({caterpillars: -1})
    .then(users => {
        res.render('leaderboard',{users})
    })
    .catch(err=>console.log(err))
})

module.exports = router