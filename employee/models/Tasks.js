const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description : {
        type: String,
    },
    meta: {
        type: Object,
    },
    caterpillarValue: {
        type: Number,
        default: 0,
    },
    typeOfTask: {
        type: String,
    },
    isAccepted: {
        type: Boolean,
    },
    acceptedBy: {
        type: String,
    },
    acceptedDate: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
    },
    assignmentDate: {
        type: String,
        default: new Date,
    }

})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;