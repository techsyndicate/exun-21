require('dotenv').config();
const express = require('express');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const taskInfo = require('./routes/taskinfo');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session');
const router = require('./routes/index');
var db = process.env.db 

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected | Employee'))
.catch(err=>console.log(err))

const app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.static(__dirname+'/public'));
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
app.use(express.json());

app.use('/', indexRoute)
app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)
app.use('/taskinfo', taskInfo)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})