const router = require('express').Router()
const { default: axios } = require('axios')
const Tasks = require('../models/Tasks')

router.post('/', (req, res) => {
    const {title, description, typeOfTask} = req.body
    let meta = {}

    if(typeOfTask == 'sourcing'){
        const photo = req.body.photo
        meta = {photo: photo}
    }else if(typeOfTask == 'manufacturing'){
        const chocolates = req.body.chocolates
        meta = {'chocolates': chocolates}
    }else{
        const address = req.body.address
        axios.get(`https://open.mapquestapi.com/geocoding/v1/address?key=crii51WOVIIPfThLN5u02uDuhTajcIAv&location=${address}`)
        .then(res => {
            const resp = res.data
            const fullAddress = resp.results[0].providedLocation.location
            const coords = resp.results[0].locations[0].latLng
            meta = {fullAddress: fullAddress, coords: coords}
            console.log(meta)
        })
        .catch(err => console.log(err))
    }

    setTimeout(() => {
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
    }, 2000)
})

module.exports = router