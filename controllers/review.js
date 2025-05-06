const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);    
    req.body.review.author = req.user._id;
    let newReview = await new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Well! New review was created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res, next) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    req.flash("success", "Well! Review was deleted");
    res.redirect(`/listings/${id}`);

};



