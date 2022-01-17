const router = require('express').Router()
const Users = require('../models/Users')
const Tasks = require('../models/Tasks')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/add', (req, res) => {
    res.render('add-task')
})

router.get('/employee/:id', (req,res)=>{
    Users.findById(req.params.id)
    .then(user=>{
        taskList = user.completedTasks
        taskList = taskList.concat(user.currentTasks)
        Tasks.find({_id: {$in: taskList}})
        .then((tasks)=>{
            res.render('employeeinfo',{user:user, tasks: tasks})
        })
        .catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.get('/taskinfo', (req,res)=>{
    const taskId = req.query.id
    Tasks.findById(taskId)
    .then(task=>{
        res.render('taskinfo',{task:task})
    })
    .catch(err=>console.log(err))
})

module.exports = router