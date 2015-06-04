;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var SceneModel = mongoose.model('Scene', {
            title: { type: String },
            summary: { type: String },
            date: { type: Date },
            characters: [mongoose.schema.Types.ObjectId],
            entities: [mongoose.schema.Types.ObjectId],
            location: {type: mongoose.schema.Types.ObjectId, ref: 'Location'},
            attributes: [],
            tags: [String],
            content: { type: String }
        });

        return SceneModel;
    };

})();