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

module.exports = router