var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server').app;

describe('BetterNovel Unit Tests', function () {
    describe('Rest Methods', function () {
        describe('User', function () {

            it('should return an error with no user specified', function (done) {
                request(app)
                    .get('/api/user')
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        expect(res.status).to.equal(404);
                        done();
                    });
            });

            it('should return with a default user', function (done) {
                request(app)
                    .get('/api/user/fakeuser')
                    .end(function (err, res) {
                        if (err) {
                            throw err;
                        }
                        expect(res.status).to.equal(200);
                        expect(res.text).to.equal('a user');
                        done();
                    });
            });
        });
    });

});