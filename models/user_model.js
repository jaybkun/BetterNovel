var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    authentication: {
        local: {
            email: { type: String },
            password: { type: String }
        },
        facebook: {
            id: { type: String },
            token: { type: String },
            email: { type: String },
            name: { type: String }
        },
        twitter: {
            id: { type: String },
            token: { type: String },
            displayName: { type: String },
            username: { type: String }
        },
        google: {
            id: { type: String },
            token: { type: String },
            email: { type: String },
            name: { type: String }
        }
    },
    username: { type: String, required: true },
    email: { type: String },
    roles: [],
    joined: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() }
});

// methods =================================
// generate a hash
userSchema.methods.generateHash = function(password) {
    "use strict";
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// check if a password is valid
userSchema.methods.validPassword = function(password) {
    "use strict";
    return bcrypt.compareSync(password, this.local.password);
};

// create the model and expose it
module.exports = mongoose.model('User', userSchema);
