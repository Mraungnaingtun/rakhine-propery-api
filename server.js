require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const port = process.env.PORT;


// /import Route
 const housingRoute = require('./routes/housing_route')

const app = express();
 app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
     useNewUrlParser: true,
     useUnifiedTopology:true,
})

const db = mongoose.connection
 db.on('error', console.error.bind(console,'connection error:'))
 db.once('open',function(){
     console.log('Connected to MongoDB')
 })

 //route
 app.use('/housing',housingRoute)

//---------------
app.listen(port,function(){
    console.log(`Server listening on port ${port}`)
})