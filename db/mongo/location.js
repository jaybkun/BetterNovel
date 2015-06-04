;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var LocationModel = mongoose.model('Location', {
            name: { type: String },
            tags: [String],
            attributes: [],
            description: {type: String}
        });

        return LocationModel;
    };

})();