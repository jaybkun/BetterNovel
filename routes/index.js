var express = require('express');
var router = express.Router();

var handlers = require('../middleware');

router.get('/api/user/:username', handlers.users.getUser);

// Default send to the index for unhandled for now
// TODO proper error routing
router.get('*', function (req, res) {
    res.render('index', {title: "Better Novel"});
});

module.exports = router;
