// routes/index.js

// include other routes ========================================================
var Auth = require('./auth');

// construct the main routing ==================================================
module.exports = function(app, passport) {
    "use strict";

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.route('/login').
        get(function(req, res) {
            // render the page and pass in any flash data
            res.render('login', { message: req.flash('loginMessage') });
        }).
        // process the login
        post(passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/register',
            failureFlash: true
        }));

    // =====================================
    // REGISTER ============================
    // =====================================
    app.route('/register').
        get(function(req, res) {

            // render the page and pass in any flash data
            res.render('register', { message: req.flash('registerMessage') });
        }).
        // process the register form
        post(passport.authenticate('local-registration', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/register', // redirect back to the registration page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =====================================
    // PROFILE =============================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user // get the user from the session
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use('/auth', new Auth(passport));
};

// router middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated, we're good
    if (req.isAuthenticated()) {
        return next();
    }
    // they aren't so send them home
    res.redirect('/');
}