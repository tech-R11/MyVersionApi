const mongoose = require("mongoose");
const movieSchema = require("./moviesModel");

const rentalSchema = new mongoose.Schema({

    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:40
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            }
        })
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255    
            }
        })
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

const rental = mongoose.model('Rental',rentalSchema);

module.exports = rental;