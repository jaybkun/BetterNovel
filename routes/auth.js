// routes/auth.js

// include the things we need ==================================================
var express = require('express');
var router = express.Router();

// construct the auth router ===================================================
module.exports = function(passport) {
    "use strict";

    router.get('/', function (req, res) {
        res.json(req.user);
    });

    return router;
};
