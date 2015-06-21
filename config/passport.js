// config/passport.js

// load libraries
var LocalStrategy = require('passport-local').Strategy;

// load the user model
var User = require('../models/user');

// expose this ot our app
module.exports = function(passport) {
    "use strict";

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL REGISTRATION ======================================================
    // =========================================================================

    passport.use('local-registration', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows passback of entire request object to callback
    },
    function(req, username, password, done) {
        User.findOne({'local.username': username}, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, req.flash('registerMessage', 'That username is already in use.'));
            } else {

                // create the user
                var newUser = new User();

                // set the local credentials
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {

        User.findOne({'local.username' : username }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
            }

            return done(null, user);
        });
    }));
};