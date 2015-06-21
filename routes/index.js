var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {
    "use strict";

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
        res.render('index');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data
        res.render('login', { message: req.flash('loginMessage') });
    });

    // process the login
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
     }));

    // =====================================
    // REGISTER ============================
    // =====================================
    router.get('/register', function(req, res) {

        // render the page and pass in any flash data
        res.render('register', { message: req.flash('registerMessage') });
    });

    // process the register form
    router.post('/register', passport.authenticate('local-registration', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the registration page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE =============================
    // =====================================
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user // get the user from the session
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use('/', router);
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