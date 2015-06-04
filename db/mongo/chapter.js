;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var ChapterModel = mongoose.model('Chapter', {
            title: { type: String },
            summary: { type: String },
            attributes: [],
            tags: [String],
            scenes: { type: String }
        });

        return ChapterModel;
    };

})();