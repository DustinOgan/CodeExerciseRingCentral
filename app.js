const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')



//import routes

const recordingsRoute = require('./routes/recordings')

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/recordings', recordingsRoute);


//ROUTES
app.get('/', (req, res ) => {
    res.send('We are home');
} );

//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    ()=> console.log('Connected successfully')
    )

//listener
app.listen(3000)