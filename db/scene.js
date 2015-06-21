module.exports = function(mongoose) {
    "use strict";

    var Schema = mongoose.Schema;

    var SceneSchema = new Schema({
        title: {type: String},
        summary: {type: String},
        date: {type: Date},
        characters: [mongoose.Schema.Types.ObjectId],
        entities: [mongoose.Schema.Types.ObjectId],
        location: {type: mongoose.Schema.Types.ObjectId, ref: 'Locations'},
        attributes: [],
        tags: [String],
        content: {type: String},
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    });
    var SceneModel = mongoose.model("Scene", SceneSchema);

    var SceneDAO = {};

    /**
     *
     * @param scene
     * @returns {Promise}
     */
    SceneDAO.addScene = function(scene) {
        var newScene = new SceneModel(scene);
        return newScene.save();
    };

    /**
     *
     * @param sceneId
     * @returns {*}
     */
    SceneDAO.getScene = function (sceneId) {
        return SceneModel.findById(sceneId).lean().exec();
    };

    /**
     *
     * @param scenes
     * @returns [{*}]
     */
    SceneDAO.getScenes = function(scenes) {
        return SceneModel.find({_id : scenes}).lean().exec();
    };

    return SceneDAO;
};
