;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var EntityModel = mongoose.model('Entity', {
            name: { type: String },
            description: { type: String },
            attributes: [],
            tags: [String]
        });

        return EntityModel;
    };

})();