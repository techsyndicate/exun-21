const router = require('express').Router()
require('dotenv').config()
router.get('/', (req, res) => {
    res.render('index',{
        api_key : process.env.map
    })
})

module.exports = router