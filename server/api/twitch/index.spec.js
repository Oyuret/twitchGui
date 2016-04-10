'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var twitchCtrlStub = {
  index: 'twitchCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var twitchIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './twitch.controller': twitchCtrlStub
});

describe('Twitch API Router:', function() {

  it('should return an express router instance', function() {
    twitchIndex.should.equal(routerStub);
  });

  describe('POST /api/twitch', function() {

    it('should route to twitch.controller.index', function() {
      routerStub.post
        .withArgs('/', 'twitchCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
