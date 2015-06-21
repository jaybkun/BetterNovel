var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    "use strict";
    var user = new db.user(req.body);
    res.json(user.save());
});

module.exports = router;
