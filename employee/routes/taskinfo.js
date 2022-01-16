const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
const Tasks = require('../models/Tasks')

router.get('/', isAuthorized, (req, res) => {
    const id = req.query.taskid;
    console.log(id)
    Tasks.findById(id).then((task) => {
        console.log(task)
        res.render('taskinfo', {task: task})
    }).catch((err) => console.log(err))
});

router.get('/chosen', isAuthorized, (req, res) => {
    const taskid = req.query.taskid;
    Tasks.findById(taskid)
    .then((task) => {
        task.acceptedBy = req.session.user;
        task.isAccepted = true;
        task.save();
        res.send('chosen');
    }).catch((err) => console.log(err))
})

module.exports = router