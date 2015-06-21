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
        passport.authenticate('local-login'),
        function(req, res) {
            res.json(req.user);
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
        passport.authenticate('local-register',
            function(req, res) {
                res.json(req.user);
            }));

    return router;
};
