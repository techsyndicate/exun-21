const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
const Tasks = require('../models/Tasks')
const Users = require('../models/Users')

router.get('/', isAuthorized, (req, res) => {
    const id = req.query.taskid;
    Tasks.findById(id).then((task) => {
        res.render('taskinfo', {task: task})
    }).catch((err) => console.log(err))
});

router.get('/chosen', isAuthorized, (req, res) => {
    const taskid = req.query.taskid;
    Tasks.findById(taskid)
    .then((task) => {
        task.acceptedBy = req.session.user;
        task.isAccepted = true;
        task.acceptedDate = new Date();
        task.save();
        Users.findById(req.session.user)
        .then((user)=>{
            user.currentTasks.push(taskid);
            user.markModified('currentTasks');
            user.save();
        })
        .catch(err=>console.log(err))
        res.send('chosen');
    }).catch((err) => console.log(err))
})

module.exports = router