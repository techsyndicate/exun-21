const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized

router.get('/', (req, res) => {
    res.send('Index')
})

router.get('/dashboard', isAuthorized, (req,res)=>{
    res.send('Dashboard')
})

module.exports = router