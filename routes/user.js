const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/user.js");

// renderSignupForm &  Signup Route
router.route("/signup")
    .get(controllerUser.renderSignupForm)
    .post(wrapAsync(controllerUser.signupUser));


// renderSigninForm & Signin Route
router.route("/login")
    .get(
        controllerUser.renderSignin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }), controllerUser.signinuser);


// Logout Route 
router.get("/logout", controllerUser.logoutUser);

module.exports = router;
