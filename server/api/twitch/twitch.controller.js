/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/twitch              ->  index
 */

'use strict';
var requestify = require('requestify');
var TWITCH_SECRET = process.env.TWITCH_SECRET;

// Fetch games
export function games(req, res) {
  var offset = req.query.offset || 0;
  var url = `https://api.twitch.tv/kraken/games/top?limit=50&offset=${offset}`;

  requestify
    .get(url, {headers:{'Connection': 'Keep-Alive', 'Client-ID':TWITCH_SECRET}})
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
  var url = `https://api.twitch.tv/kraken/streams?limit=50&offset=${offset}&game=${game}`;

  requestify
    .get(url, {headers:{'Connection': 'Keep-Alive', 'Client-ID':TWITCH_SECRET}})
    .then(function(response){
      res.send(response.getBody());
    },function(error){
      res.status(400).end(error);
    }).catch(function(error){
    res.status(400).end(error);
  });
}

// Fetch channels we follow
export function following(req, res) {
  var offset = req.query.offset || 0;
  var username = req.query.username;
  var url = `https://api.twitch.tv/kraken/users/${username}/follows/channels?limit=50&offset=${offset}`;

  requestify
    .get(url, {headers:{'Connection': 'Keep-Alive', 'Client-ID':TWITCH_SECRET}})
    .then(function(response){
      res.send(response.getBody());
    },function(error){
      res.status(400).end(error);
    }).catch(function(error){
    res.status(400).end(error);
  });
}

// Fetch channels we follow
export function followedStreams(req, res) {
  var channels = req.query.channels;
  var url = `https://api.twitch.tv/kraken/streams?limit=50&channel=${channels}`;

  requestify
    .get(url, {headers:{'Connection': 'Keep-Alive', 'Client-ID':TWITCH_SECRET}})
    .then(function(response){
      res.send(response.getBody());
    },function(error){
      res.status(400).end(error);
    }).catch(function(error){
    res.status(400).end(error);
  });
}

// Search for games
export function searchGames(req, res) {
  var q = req.query.q;
  var url = `https://api.twitch.tv/kraken/search/games?q=${q}&type=suggest&live=true`;

  requestify
    .get(url, {headers:{'Connection': 'Keep-Alive', 'Client-ID':TWITCH_SECRET}})
    .then(function(response){
      res.send(response.getBody());
    },function(error){
      res.status(400).end(error);
    }).catch(function(error){
    res.status(400).end(error);
  });
}
