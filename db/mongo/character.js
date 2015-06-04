;(function() {
    'use strict';

    module.exports = function(mongoose) {
        var CharacterModel = mongoose.model('Character', {
            name: { type: String },
            relationships: [],
            attributes: [],
            sex: { type: String },
            dob: { type: Date },
            dod: { type: Date },
            alias: [String],
            description: { type: String },
            works: [ ]
        });

        return CharacterModel;
    };

})();