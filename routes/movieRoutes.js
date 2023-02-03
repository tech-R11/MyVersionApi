const express = require("express");
const inputValidation = require("../middleware/inputValidation").inputValidationForMovie;
const Movie = require("../models/moviesModel");
const Genre = require("../models/genreModel").Genre;

const router = express.Router();

router.get("/",async function(req,res){
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get("/:id",async function(req,res){
    const movie = await Movie.findById(id);
    if(!movie)
        return res.status(404).send("Movie not found");
    res.send(movie);    
});

router.post("/",async function(req,res){
    const err = inputValidation(req.body);
    if(err)
        return res.send(err.details[0].message);
    const {title,numberInStock,dailyRentalRate,genreId} = req.body;
    const genre = await Genre.findById(genreId);
    if(!genre)
        return res.status(400).send("Invalid Genre");
    const movie = new Movie({
        title,
        numberInStock,
        dailyRentalRate,
        genre:{
            _id:genre._id,
            name:genre.name
        } 
    });
    await movie.save();
    res.send(movie);
});

router.delete("/:id",async function(req,res){
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie)
        return res.send("requested movie not found");
    res.send(movie);
});
module.exports = router;