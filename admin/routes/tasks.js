const router = require('express').Router()
const { default: axios } = require('axios')
const Tasks = require('../models/Tasks')

router.post('/', (req, res) => {
    const {title, description, typeOfTask} = req.body
    let meta = {}

    if(typeOfTask == 'sourcing'){
        const idealColor = req.body.photo
        meta = {idealColor}
    }else if(typeOfTask == 'manufacturing'){
        const chocolates = req.body.chocolates
        meta = {'chocolates': chocolates}
    }else{
        const address = req.body.address
        axios.get(`https://open.mapquestapi.com/geocoding/v1/address?key=crii51WOVIIPfThLN5u02uDuhTajcIAv&location=${address}`)
        .then(res => {
            const resp = res.data
            let coords = {}
            if (resp.results[0].locations.length > 0) {
                coords = resp.results[0].locations[0].latLng
            } else {
                coords = {lat: 0, lng: 0}
            }
            meta = {address: address, coords: coords}
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