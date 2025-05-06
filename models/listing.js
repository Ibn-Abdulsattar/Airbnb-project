    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    const Review = require("./review.js");
    const { string } = require("joi");

    const listingSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            url: String,
            filename: String,
        },
        category: {
            type: String,
            enum: ["Trending", "Amazing views", "Iconic cities", "Surfing", "Amazing pools", "Beach", "Cabins", "Lakefront", "Castles"],
            required: true
        },
        price: {
            type: Number,
            validate: {
                validator: function (v) {
                    return v > 0;
                },
                message: 'Price must be greater than zero.'
            }
        },        
        location: {
            type: String
        },
        country: {
            type: String
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review",
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        geometry: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    }, {
        timestamps: true
    });

    listingSchema.post("findOneAndDelete", async (listing) => {
        if (listing) {
            let output = await Review.deleteMany({ _id: { $in: listing.reviews } });
            console.log(output);
        }
    })

    const Listing = mongoose.model("Listing", listingSchema);
    module.exports = Listing;
