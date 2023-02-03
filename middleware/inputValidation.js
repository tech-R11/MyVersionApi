const Joi = require('joi');

module.exports.inputValidationForGenre = function inputValidation(data){
    const schema = {
        genre:Joi.string().min(3).required()
    };
    return Joi.validate(data,schema).error;
}

module.exports.inputValidationForCustomer = (data)=>{
    const schema = {
        name:Joi.string().min(5).required(),
        phone:Joi.string().min(10).max(10).required(),
        isGold:Joi.boolean()
    };
    return Joi.validate(data,schema).error;
}

module.exports.inputValidationForMovie = (data)=>{
    const schema = {
        title:Joi.string().min(5).max(50).required(),
        genreId:Joi.ObjectId().required(),//here we only demand the genreId as input
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    };
    return Joi.validate(data,schema).error;
}

module.exports.inputValidationForRental = (data)=>{
    const schema = {
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    };

    return Joi.validate(data,schema).error;
}

module.exports.inputValidationForUser = (data)=>{
    const schema = {
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).max(100),
    }
    return Joi.validate(data,schema).error;
}