const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.Map_Token;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
    let { category, search} = req.query;

    let filter = {};
    if(category){
        filter.category = category;
    }

    if(search){
        filter.$or= [
            {title: new RegExp(search, "i")},
            {location: new RegExp(search, "i")},
            {description: new RegExp(search, "i")}
        ]
    }
    let allListings = await Listing.find(filter);


    res.render("./listing/index.ejs", { allListings, category, search });
};

module.exports.renderNewForm = async (req, res, next) => {
    res.render('listing/new');
};

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/");  // ❗ Return added
    }

    res.render("./listing/show.ejs", { listing });
};


module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.Listing.location,
        limit: 1
    })
        .send()

    req.body.Listing.owner = req.user._id;

    const newListing = new Listing(req.body.Listing); // ✅ Create a model instance

    if (req.file) {
        const { path: url, filename } = req.file;
        newListing.image = { url, filename }; // ✅ Assign image only if file exists
    }
    newListing.geometry = response.body.features[0].geometry;

    let output = await newListing.save();
    console.log(output);

    req.flash("success", "New listing was created");
    res.redirect("/");
};

module.exports.renderEditForm = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/");
    }
    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250");
    console.log(originalImgUrl);
    res.render("./listing/edit.ejs", { listing, originalImgUrl });
};

module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/");
    }

    Object.assign(listing, req.body.Listing);

    if (req.file) {
        const { path: url, filename } = req.file;
        listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Listing was updated");
    res.redirect(`/${listing._id}`);
};


module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing was deleted");
    res.redirect("/");
};