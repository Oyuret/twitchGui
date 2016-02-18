/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var requestify = require('requestify');

module.exports = function(app) {

  app.post('/twitch', function(req,res){
    var url = req.body.url;

    requestify
      .get(url, {headers:{'Connection': 'Keep-Alive'}})
      .then(function(response){
        res.send(response.getBody());
      },function(error){
        res.status(400).end(error);
      }).catch(function(error){
        res.status(400).end(error);
      });
  });

  app.post('/kodi', function(req,res){
    var query = req.body.query;
    var kodiAddr = req.body.kodi;

    requestify
      .post(kodiAddr, query, {headers:{'Connection': 'Keep-Alive'}})
      .then(function(response){
        res.send(response.getBody());
      },function(error){
        res.status(400).end(error);
      }).catch(function(error){
        res.status(400).end(error);
      });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
