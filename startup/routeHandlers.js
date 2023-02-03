const express = require("express");
const genreRouter = require('../routes/genreRoutes');
const customerRouter = require('../routes/customerRoutes');
const movieRouter  = require('../routes/movieRoutes');
const rentalRouter = require('../routes/rentalsApi');
const userRouter  = require('../routes/signUpLoginUser');
const error = require("../middleware/error");

module.exports =(app)=>{
    app.use(express.json());
    app.use('/api/genre',genreRouter);
    app.use('/api/customer',customerRouter);
    app.use('/api/movie',movieRouter);
    app.use('/api/rental',rentalRouter);
    app.use('/api/user',userRouter);
    app.use(error);
} 