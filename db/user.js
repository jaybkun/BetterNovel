var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    meta: {
        age: { type: Number },
        sex: { type: String },
        location: { type: String }
    },
    social: {
        reddit: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        tumblr: { type: String },
        website: { type: String }
    },
    admin: { type: Boolean },
    alias: { type: String },
    joined: { type: Date, default: new Date() },
    update: { type: Date },
    email: { type: String },
    options: { }
});

UserSchema.pre('save', function(next) {
    "use strict";
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.has(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    "use strict";

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;