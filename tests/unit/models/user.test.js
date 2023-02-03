const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
describe('user.generateAuthToken',()=>{
    it('should return a valid token',()=>{
       const payload = {
        _id:new mongoose.Types.ObjectId().toHexString()
       };
       const user = new User(payload);
       const token = user.generateAuthToken();
       const decode = jwt.verify(token,config.get('jwtPrivateKey'));
       expect(decode).toMatchObject(payload); 
    })
})
