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

router.get('/verify', isAuthorized, (req,res)=>{
    if(req.query.typeOfTask == 'sourcing'){
        // do stuff here
        update(10);
    }else if(req.query.typeOfTask == 'manufacturing'){
        // do stuff here
        update(15);
    }else if(req.query.typeOfTask == 'transporting'){
        // do stuff here
        update(20);
    }

    function update(caterpillarValue){
        Tasks.findById(req.query.taskid)
        .then(task=>{
            task.isCompleted = true
            task.save()
            Users.findById(req.session.user)
            .then(user=>{
                const index = user.currentTasks.indexOf(req.query.taskid);
                if (index > -1) {
                    user.currentTasks.splice(index, 1);
                }
                user.completedTasks.push(req.query.taskid)
                user.caterpillars += caterpillarValue
                user.markModified('currentTasks')
                user.markModified('completedTasks')
                user.save()
                .then(res.send('completed'))
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
})

module.exports = router