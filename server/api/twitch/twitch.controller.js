/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/twitch              ->  index
 */

'use strict';
var requestify = require('requestify');

// Makes a request to Twitch API
export function index(req, res) {
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
}
