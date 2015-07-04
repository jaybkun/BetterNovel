// routes/users_routes.js

// include the things we need ==================================================
var express = require('express');
var router = express.Router();

// load the user model
var User = require('../models/user_model');

// construct the auth router ===================================================
module.exports = function(passport) {
    "use strict";

    router.get('/', function(req, res) {
        User.find().lean().exec().then(function(user) {
            res.json(user);
        });
    });



    return router;
};
