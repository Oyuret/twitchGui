/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/twitch              ->  index
 */

'use strict';
var requestify = require('requestify');

// Fetch games
export function games(req, res) {
  var offset = req.query.offset || 0;
  var url = 'https://api.twitch.tv/kraken/games/top?limit=50&offset=' + offset;

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

// Fetch streams
export function streams(req, res) {
  var offset = req.query.offset || 0;
  var game = req.query.game;
  var url = 'https://api.twitch.tv/kraken/streams?limit=50&offset='+ offset + '&game=' + game;

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
