const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
const User = require('../models/Users')
const Tasks = require('../models/Tasks')

router.get('/', isAuthorized, (req, res) => {
    Tasks.find({}).then((task) => {
        User.findOne({_id: req.session.user}, (err, user) => {
            if (err) throw err;
            res.render('dashboard', {user, task})
        })
    }).catch((err) => console.log(err))
});

router.post('/update', isAuthorized, (req, res) => {
    User.findById(req.session.user).then((user) => {
        user.last_known_location = req.body.currentPosition
        user.save().then((user) => {
            res.json({success: true})
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
});

module.exports = router