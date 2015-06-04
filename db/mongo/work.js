;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var WorkModel = mongoose.model('Work', {
            title: { type: String },
            subtitle: { type: String },
            author: [ String ],
            tags: [String],
            creationDate: { type: Date },
            publicationDate: {type: Date },
            characters: [mongoose.schema.Types.ObjectId],
            acts: []
        });

        return WorkModel;
    };

})();