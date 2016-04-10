'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var kodiCtrlStub = {
  index: 'kodiCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var kodiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './kodi.controller': kodiCtrlStub
});

describe('Kodi API Router:', function() {

  it('should return an express router instance', function() {
    kodiIndex.should.equal(routerStub);
  });

  describe('POST /api/kodi', function() {

    it('should route to kodi.controller.index', function() {
      routerStub.post
        .withArgs('/', 'kodiCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
