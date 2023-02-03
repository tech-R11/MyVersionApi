const mongoose =require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    isGold:{
        type:Boolean,
        required:true

    },
    phone:{
        type:String,
        required:true
    }
});

const customer = mongoose.model('Customer',customerSchema);
module.exports = customer;