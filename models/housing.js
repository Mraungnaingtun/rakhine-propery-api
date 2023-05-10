const mongoose = require('mongoose')

const housingModel = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    village_or_quartar:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:false
    },
    area:{
        type:String,
        required:false,
    },
    post_time:{
        type:Date,
        default:Date.now
    },
    price:{
        type:String,
        required:false
    },
    images: [
        {
          data: Buffer,
          contentType: String,
        },
      ],
});

const land = mongoose.model('property',housingModel)
module.exports = land;