;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var ActModel = mongoose.model('Act', {
            title: { type: String },
            subtitle: { type: String },
            tags: [String],
            chapters: []
        });

        return ActModel;
    };

})();