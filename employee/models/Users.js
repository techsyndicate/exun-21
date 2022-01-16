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
    last_known_location: {
        type: Array,
        default: [],
    }
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;