require('dotenv').config();
const express = require('express');
const adminRoute = require('./routes/admin');
const mongoose = require('mongoose')
var db = process.env.db 

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected | Admin'))
.catch(err=>console.log(err))

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended: true}));

app.use('/admin', adminRoute)
app.use('/tasks', adminRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})