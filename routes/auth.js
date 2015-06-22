// routes/auth.js

// include the things we need ==================================================
var express = require('express');
var router = express.Router();

// construct the auth router ===================================================
module.exports = function(passport) {
    "use strict";

    // ======================================
    // SESSION ==============================
    // ======================================
    router.get('/', function (req, res) {
        res.json(req.user);
    });

    // ======================================
    // LOGIN ================================
    // ======================================
    router.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/auth/loginSuccess',
            failureRedirect: '/auth/loginFail',
            failureFlash: true
        }));

    router.get('/loginSuccess', function(req, res) {
        res.json(req.user);
    });

    router.get('/loginFail', function(req, res) {
        res.json({ error: "Incorrect username or password" });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.post('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // REGISTER ============================
    // =====================================
    router.post('/register',
        passport.authenticate('local-registration', {
            successRedirect: '/auth/registerSuccess',
            failureRedirect: '/auth/registerFail',
            failureFlash: true
        }));

    router.get('/registerSuccess', function(req, res) {
        res.json(req.user);
    });

    router.get('/registerFail', function(req, res) {
        // TODO get the correct error message
        res.json({ error: "That username is already in use" });
    });

    return router;
};
