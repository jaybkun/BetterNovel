;(function() {
    'use strict';

    module.exports = {
        scene: function() {
            return {
                title: {type: String},
                summary: {type: String},
                date: {type: Date},
                characters: [mongoose.schema.Types.ObjectId],
                entities: [mongoose.schema.Types.ObjectId],
                location: {type: mongoose.schema.Types.ObjectId, ref: 'Location'},
                attributes: [],
                tags: [String],
                content: {type: String}
            };
        }
    };


})();