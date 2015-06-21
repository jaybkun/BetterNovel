;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var WorkModel = mongoose.model('Work', {
            title: { type: String },
            subtitle: { type: String },
            author: [ String ],
            tags: [String],
            volume: { type: Number, default: 1},
            publicationDate: {type: Date },
            characters: [mongoose.schema.Types.ObjectId],
            acts: [],
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now }
        });

        return WorkModel;
    };

})();