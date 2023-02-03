const express= require("express");
const mongoose = require("mongoose");
//const Fawn = require('fawn');
const Rental = require("../models/rentalModel");
const Movie = require("../models/moviesModel");
const Customer = require("../models/customerModel");
const inputValidation = require("../middleware/inputValidation").inputValidationForRental;


const router = express.Router();    

//Fawn.init(mongoose);

router.get("/",async function(req,res){
    
    const rental = await Rental.find().sort('-dateOut');//-for decending order
    res.send(rental);

});

router.post("/",async function(req,res){
    const err = inputValidation(req.body);
    if(err)
        return res.send(err.details[0].message);
    
        const movie = await Movie.findById(req.body.movieId);     
    if(!movie)
        return res.send("Movie not found");
    
        const customer = await Customer.findById(req.body.customerId);
    if(!customer)
        return res.send("customer not found");

    const rental = new Rental({
        customer:{
            _id:customer.id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });

    await rental.save();
    movie.numberInStock--;
    movie.save();
    // try {
    //     new Fawn.Task()
    //     .save('rentals',rental)
    //     .update('movies',{_id:movie._id},{
    //         $inc: { numberInStock:-1 }
    //     }).run();//run must be called to actually execute the above code
    // } catch (error) {
    //     res.send(500).send("sonething failed");
    // }
    res.send(rental);

});

module.exports = router;