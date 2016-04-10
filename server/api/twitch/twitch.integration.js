'use strict';

var app = require('../..');
import request from 'supertest';

describe('Twitch API:', function() {

  describe('POST /api/twitch', function() {
    var twitchs;

    beforeEach(function(done) {
      request(app)
        .post('/api/twitch')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          twitchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      twitchs.should.be.instanceOf(Array);
    });

  });

});
