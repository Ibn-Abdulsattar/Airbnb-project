const express = require("express");
const router = express.Router({ mergeParams: true }); // ✅ correct
const wrapAsync = require("../utilis/wrapAsync.js");
const { validateReview } = require("../middleware.js");
const { isLoggedIn, isreviewAuthored } = require("../middleware.js")
const reviewController = require("../controllers/review.js");

// Create Reviews Route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

// Delete Reviews Route
router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthored,
    wrapAsync(reviewController.destroyReview));


module.exports = router;













