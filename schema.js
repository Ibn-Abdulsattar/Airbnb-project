const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        image: Joi.object().allow(null, ""),
        category: Joi.string()
            .valid("Trending", "Amazing views", "Iconic cities", "Surfing", "Amazing pools", "Beach", "Cabins", "Lakefront", "Castles")
            .required()
        ,
        price: Joi.number().greater(0)
            .required(),
        location: Joi.string()
            .required(),
        country: Joi.string()
            .required(),
    }).required(),
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string()
            .required(),
        rating: Joi.number().min(1).max(5)
            .required(),
    }).required(),
});






