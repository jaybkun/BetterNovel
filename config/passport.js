// config/passport.js

// load the things we need =====================================================
var Promise = require('bluebird');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

// load the user model
var User = require('../models/user_model');

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
    function createLocalUser(username, password, email) {
        var newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.authentication.local.password = newUser.generateHash(password);
        newUser.roles.push('user');
        return newUser.save();
    }

    passport.use('local-registration', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows passback of entire request object to callback
    }, function(req, username, password, done) {

        return User.findOne({'username': username}).
            then(function (userByUsername) {
                if (userByUsername) {
                    throw 'That username is already in use.';
                } else {
                    return User.findOne({'email': req.body.email})
                }
            }).
            then(function(userByEmail) {
                if (userByEmail) {
                    throw 'That email address has already been registered.';
                } else {
                    return createLocalUser(username, password, req.body.email);
                }
            }).
            then(function (newUser) {
                return done(null, newUser);
            }).
            catch(function (error) {
                return done(null, false, req.flash('registerMessage', error));
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

        User.findOneAndUpdate({'username': username}, {lastLogin: new Date()}, function (err, user) {
            if (err) {
                return done(null, err);
            } else if (!user) {
                req.error = "Incorrect username";
                return done(null, false);
            } else if (!user.validPassword(password)) {
                req.error = "Incorrect password";
                return done(null, false);
            }
            return done(null, user);
        });
    }));
};


