require('dotenv').config();
const express = require('express');
const indexRoute = require('./routes/indexRoute');
const mongoose = require('mongoose')
var db = process.env.db 

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected | Employee'))
.catch(err=>console.log(err))

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'public'));
app.use(express.urlencoded({extended: true}));

app.use('/',indexRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})