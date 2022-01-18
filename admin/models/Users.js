const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email : {
        type: String,
    },
    pfp: {
        type: String,
    },
    date: {
        type: String,
        default: new Date,
    },
    caterpillars :{
        type: Number,
        default: 0,
    },
    cocoabeans:{
        type:Number,
        default:0,
    },
    currentTasks :{
        type: Array,
    },
    completedTasks :{
        type: Array,
    },
    last_known_location: {
        type: Array,
        default: [],
    }
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;