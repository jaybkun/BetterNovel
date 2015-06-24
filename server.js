// server.js

// server setup ================================================================
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var multer = require('multer');
var bodyParser = require('body-parser');
var session = require('express-session');
var sassMiddleware = require('node-sass-middleware');

var configDB = require('./config/database.js');

// Configuration ===============================================================
mongoose.connect(configDB.url);
mongoose.connection.on('connected', function() { console.log("MongoDB connected"); });
mongoose.connection.on('disconnected', function() { console.log("MongoDB disconnected"); });

require('./config/passport')(passport); // pass passport for configuration

// application setup
app.use(morgan('dev')); // log all requests to the console
app.use(cookieParser()); // read cookies (auth)
app.use(bodyParser.json()); // get html form information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './uploads' })); // get multi-part uploads for images
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/styles', sassMiddleware({
    src: path.join(__dirname, '/scss'),
    dest: path.join(__dirname, '/public/styles'),
    debug: true,
    outputStyle: 'expanded'
}));

app.set('view engine', 'jade');  // setup jade for templating

// configure passport
app.use(session({secret: 'traveldogisthewonderdog', resave: false, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login
app.use(flash()); // connect-flash for flash messages stored in session

// configure static components
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
require('./routes/index')(app, passport);

// start listening =============================================================
var port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, address, function() {
    console.log("BetterNovel ready for writing on port", port);
});

