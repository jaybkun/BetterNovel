;(function() {
    'use strict';

    var chai = require('chai');
    chai.use(require('chai-as-promised'));
    var expect = require('chai').expect;

    var Scene = require('../models').scene;

    describe('Save Scene', function() {
        it('saves text to the database in a scene', function() {
            var scene = new Scene.scene();
            var text = 'Thus spoke the TravelDog "a complete waste-nado of my time"';
            scene.setText(text);

            return expect(scene.text).to.equal(text);
        });
    });


})();
