const mongoose = require("mongoose");
const genreSchema = require("./genreModel").genreSchema;

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        reqired:true
    },
    numberInStock:{
        type:Number,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
    },
    genre:{
        type:genreSchema,
        required:true,
    }
});

module.exports = mongoose.model('Movie',movieSchema);