// server.js

var express = require('express');
var app = exports.app = express();
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

// Server config ===============================================================
app.set('view engine', 'jade');

app.use(morgan('dev')); // Logging
app.use(cookieParser()); // Read cookies (auth)
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

// configure static components
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
app.use(require('./routes'));

// start listening =============================================================
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, address, function () {
    console.log("BetterNovel ready for writing on port", port);
});

server.on('clientError', function (exception, sock) {
    console.error(exception, sock);
});
