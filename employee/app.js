require('dotenv').config();
const express = require('express');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose')
const session = require('express-session');
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
app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      saveUninitialized: false,
      resave: false,
    })
  );

app.use('/', indexRoute)
app.use('/auth', authRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})