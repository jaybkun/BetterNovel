// routes/index.js

// include other routes ========================================================
var Auth = require('./auth_routes');

// construct the main routing ==================================================
module.exports = function(app, passport) {
    "use strict";

    app.use('/auth', new Auth(passport));
};

/*
// router middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated, we're good
    if (req.isAuthenticated()) {
        return next();
    }
    // they aren't so send them home
    res.redirect('/');
}
*/