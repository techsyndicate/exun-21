const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
const User = require('../models/Users')
router.get('/', isAuthorized,(req, res) => {
    User.findOne({_id: req.session.user}, (err, user) => {
        if(err) return console.log(err)
        res.render('dashboard', {user})
    })
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