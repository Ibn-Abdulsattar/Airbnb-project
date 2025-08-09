const User = require("../models/user.js");

module.exports.renderSignupForm =  (req, res, next) => {
    res.render("users/signup");
};

module.exports.signupUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        console.log(password);
        const newuser = new User({ username, email });
        let regiuser = await User.register(newuser, password);
        req.login(regiuser, (err) => {
            if (err) {
                next(err);
            } else {
                req.flash("success", "Welcome to WanderLust!");
                res.redirect("/");
            }
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderSignin =  (req, res, next) => {
    res.render("users/login");
};

module.exports.signinuser = async (req, res, next) => {
    req.flash("success", "Welcome to WanderLust! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            req.flash("success", "You are logged out");
            res.redirect("/");
        }

    })
};



