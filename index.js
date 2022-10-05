const express = require('express');
const app = express();
var cors = require('cors')
const bodyparser = require('body-parser')
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs');
require("dotenv").config()
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



const dbconnect = require('./config/database.js')

//home
const infoHome = require('./Router/home.js')
app.use('/home',infoHome)

//register
const infoAdminRouter = require('./Router/register.js')
app.use('/AdminRegisteration',infoAdminRouter)

//login
const infoLogin = require('./Router/login.js')
app.use('/login',infoLogin);

//nursepaage
const infoNurse = require('./Router/nursePage.js')
app.use('/nurse',infoNurse);

//doctorpaage
const infoDoctor= require('./Router/doctor.js')
app.use('/doctor',infoDoctor);



// port connection
app.listen(process.env.PORT || 9966,()=>{
    console.log(`listening on ${process.env.PORT}`)
})
 
// dbconnect
dbconnect();


