var express = require('express');
var passport = require('passport');
var User = require('../db').user;
var router = express.Router();

// GET auth
router.get('/', function(req, res, next) {
    passport.authenticate('local')(function(req, res) {
        res.json(req.user);
    });
});

// POST login
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

// GET logout
router.get('/logout', function(req, res, next) {
    res.json({success:true});
});

// POST register
router.post('/register', function(req, res, next) {
    User.createUser(new User(req.body)).then(function(response) {
        if (response.error) {
            res.json(response.error);
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

module.exports = router;
