const express = require('express');
const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const inputValidation = require('../middleware/inputValidation').inputValidationForCustomer;
const router = express.Router();

router.get('/',async(req,res)=>{
    const customerCollection = await Customer.find().sort('name')
    res.send(JSON.stringify(customerCollection));
});

router.get('/:id',async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer)
        return res.status(404).send('the given input is invalid'); 
    res.send(customer);
    });

router.post('/',async(req,res)=>{
    let inputCustomer  = req.body;
    const err = inputValidation(req.body);
    if(err)
       return res.send(err);
    let customer = await Customer.findOne({name:inputCustomer.name});
    if(customer){
        return res.send('customer Already present');
    } 
    
    customer = new Customer({
        name:inputCustomer.name,
        isGold:inputCustomer.isGold,
        phone:inputCustomer.phone
    });

    await customer.save();
    res.send(customer);
});

router.put('/:id',async(req,res)=>{
    const err = inputValidation(req.body);
    if(err)
       return res.send(err);
    const customer = await Customer.findOneAndUpdate({_id:req.params.id});
    if(!customer){
        return res.send('requested customer not found');
    }    
    res.send(customer);
});

router.delete('/:id',async(req,res)=>{
    const customer = await Customer.findOneAndDelete({_id:req.params.id});
    if(!customer){
        return res.send('requested genre not found');
    }    
    res.send(JSON.stringify(customer));
});

module.exports = router;