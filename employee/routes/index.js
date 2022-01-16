const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
router.get('/', (req, res) => {

    res.render('index')
})


module.exports = router