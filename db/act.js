;(function() {
    'use strict';

    var bluebird = require('bluebird');
    var mongoose = bluebird.promisifyAll(require('mongoose'));
    var Schema = mongoose.Schema;

    /**
     *
     * @param mongoose
     * @constructor
     */
    var ActSchema = new Schema({
            title: { type: String },
            subtitle: { type: String },
            tags: [String],
            chapters: []
        });
    var ActModel = mongoose.model('Act', ActSchema);
    var ActDAO = {};

    ActDAO.addAct = function(act) {
        return ActModel.save(act);
    };

    ActDAO.getAct = function(actId) {
        return this.model.findById(actId);
    };

    module.exports = ActDAO;
})();