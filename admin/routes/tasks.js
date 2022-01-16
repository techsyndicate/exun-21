const router = require('express').Router()
const Tasks = require('../models/Tasks')

router.post('/', (req, res) => {
    const {title, description, typeOfTask} = req.body

    if(typeOfTask == 'sourcing'){
        const photo = req.body.photo
        var meta = {photo: photo}
    }else if(typeOfTask == 'manufacturing'){
        const chocolates = req.body.chocolates
        var meta = {'chocolates': chocolates}
    }else{
        const address = req.body.address
        var meta = {'address': address}
    }

    const newTask = new Tasks({
        title: title,
        description: description,
        meta: meta,
        typeOfTask: typeOfTask,
        isAccepted: false,
        isCompleted: false,
    })

    newTask.save()
    .then(()=>{
        console.log('added')
        res.redirect('/admin')
    })
    .catch(err=>console.log(err))
})

module.exports = router