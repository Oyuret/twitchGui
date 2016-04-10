'use strict';

var app = require('../..');
import request from 'supertest';

describe('Kodi API:', function() {

  describe('POST /api/kodi', function() {
    var kodis;

    beforeEach(function(done) {
      request(app)
        .post('/api/kodi')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          kodis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      kodis.should.be.instanceOf(Array);
    });

  });

});
