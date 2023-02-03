const mongoose = require("mongoose");
const winston = require("winston");
module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/vidly')
    .then(()=>{
        winston.info("connected to mongoDB");
    })
}