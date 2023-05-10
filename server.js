const express = require('express');
const mongoose = require('mongoose')


//MongoDB connection String
const {MONGO_URI} = require('./config')

//import Route
const housingRoute = require('./routes/housing_route')

const app = express();
app.use(express.json())

//Connect to MongoDB
mongoose.connect(MONGO_URI,{
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
app.listen(3000,function(){
    console.log('Server listening on port 3000')
})