const express =require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User =  require("../models/userModel");
const inputValidation = require("../middleware/inputValidation").inputValidationForUser;
const router = express.Router();

router.post("/",async function(req,res){
    const err = inputValidation(req.body);
    if(err)
        return res.send(err.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user)
        return res.send("given user already exists, Login to continue");
    user =new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);    
    await user.save();
    //res.send(_.pick(user,['name','email']));
    const token = user.genreateAuthToken();
    res.header('x-auth-token',token).send(user.email);
});

router.post("/login",async function(req,res){
    const {email,password} = req.body;
    let user = await User.findOne({email:email});
    if(!user)
        return res.status(404).send('email or password is invalid..');
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword)
        return res.send("email or password is invalid..");
    const token = user.genreateAuthToken();
    res.header('x-auth-token',token).send(user.email);
})

module.exports = router;