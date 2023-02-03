const express = require('express');
const mongoose = require("mongoose");
const Genre = require("../models/genreModel").Genre;
const inputValidation = require('../middleware/inputValidation').inputValidationForGenre;
const router = express.Router();


router.get('/',async(req,res)=>{
    const genreCollection = await Genre.find().sort('name');
    res.send(JSON.stringify(genreCollection));
});

router.get('/:id',async(req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre)
        return res.status(404).send('the given input is invalid'); 
    res.send(genre);
    });

router.post('/',async(req,res)=>{
    let inputGenre  = req.body.genre;
    const err = inputValidation(req.body);
    if(err)
       return res.send(err);
    let genre = await Genre.findOne({name:inputGenre});
    if(genre){
        return res.send('genre Already present');
    } 
    
    genre = new Genre({
        name:inputGenre
    })

    await genre.save();
    res.send(inputGenre);
});

router.put('/:id',async(req,res)=>{
    const err = inputValidation(req.body);
    if(err)
       return res.send(err);
    const genre = await Genre.findOneAndUpdate({_id:req.params.id},{
        name:req.body.genre
    });
    if(!genre){
        return res.send('requested genre not found');
    }    
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id',async(req,res)=>{
    const genre = await Genre.findOneAndDelete({_id:req.params.id});
    if(!genre){
        return res.send('requested genre not found');
    }    
    res.send(JSON.stringify(genre));
});


module.exports = router;