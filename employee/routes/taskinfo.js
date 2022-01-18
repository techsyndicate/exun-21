const router = require('express').Router()
const isAuthorized = require('../config/checker').isAuthorized
const Tasks = require('../models/Tasks')
const Users = require('../models/Users')
const axios = require('axios')

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

router.post('/verify', isAuthorized, (req,res)=>{
    if(req.query.typeOfTask == 'sourcing'){
        Tasks.findById(req.query.taskid)
        .then((task)=>{
            if (Math.abs(Number(task.meta.idealColor) - Number(req.body.actualColor)) < 50){
                update(10, req.body);
            } else {
                return res.json({success: false})
            }
        })
    }else if(req.query.typeOfTask == 'manufacturing'){
        Tasks.findById(req.query.taskid)
        .then((task)=>{
            if (req.body.actualWeight.length > 0) {
                if (Number(req.body.actualWeight) == Number(task.meta.chocolates)) {
                    update(15, req.body);
                } else {
                    return res.json({success: false})
                }
            } else {
                return res.json({success: false})
            }
        })
    }else if(req.query.typeOfTask == 'transporting'){
        Tasks.findById(req.query.taskid)
        .then((task) => {
            const originCoords = req.body.actualLocation
            const destinationCoords = task.meta.coords
            let url = `https://api.radar.io/v1/route/distance?origin=${originCoords[0]},${originCoords[1]}&destination=${destinationCoords.lat},${destinationCoords.lng}&modes=car&units=metric`;
            axios.get(url, {
                headers: {
                    'Authorization': 'prj_live_sk_023b2379b86ae218901dd83336e69dce2f8276ac'
                }
            })
            .then((response) => {
                const data = response.data
                console.log(data)
                if (data.routes.car.distance.value < 2000) {
                    update(20, req.body);
                } else {
                    return res.json({success: false})
                }
            })
            .catch(err => console.log(err))
        })
    }

    function update(caterpillarValue, verifyMeta){
        Tasks.findById(req.query.taskid)
        .then(task=>{
            task.isCompleted = true
            task.meta.verifyMeta = verifyMeta;
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
                .then(res.json({success: true}))
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
})

module.exports = router