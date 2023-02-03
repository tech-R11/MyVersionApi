const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
}

module.exports = mongoose.model('User',userSchema);
