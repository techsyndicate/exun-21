const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/add', (req, res) => {
    res.render('add-task')
})

module.exports = router