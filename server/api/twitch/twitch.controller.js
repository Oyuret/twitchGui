/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/twitch              ->  index
 */

'use strict';
var rp = require('request-promise');
var TWITCH_SECRET = process.env.TWITCH_SECRET;

// Fetch games
export function games(req, res) {
  var offset = req.query.offset || 0;
  var url = `https://api.twitch.tv/kraken/games/top?limit=50&offset=${offset}`;

  var options = {
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'Connection': 'Keep-Alive',
      'Client-ID':TWITCH_SECRET
    }
  };

  rp(options)
    .then(function(response){
      res.send(response);
    })
    .catch(function(error){
      if(error.statusCode) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
  });

}

// Fetch streams
export function streams(req, res) {
  var offset = req.query.offset || 0;
  var game = req.query.game;
  var url = `https://api.twitch.tv/kraken/streams?limit=50&offset=${offset}&game=${game}`;

  var options = {
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'Connection': 'Keep-Alive',
      'Client-ID':TWITCH_SECRET
    }
  };

  rp(options)
    .then(function(response){
      res.send(response);
    })
    .catch(function(error){
      if(error.statusCode) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    });
}

// Fetch channels we follow
export function following(req, res) {
  var offset = req.query.offset || 0;
  var username = req.query.username;
  var url = `https://api.twitch.tv/kraken/users/${username}/follows/channels?limit=50&offset=${offset}`;

  var options = {
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'Connection': 'Keep-Alive',
      'Client-ID':TWITCH_SECRET
    }
  };

  rp(options)
    .then(function(response){
      res.send(response);
    })
    .catch(function(error){
      if(error.statusCode) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    });
}

// Fetch channels we follow
export function followedStreams(req, res) {
  var channels = req.query.channels;
  var url = `https://api.twitch.tv/kraken/streams?limit=50&channel=${channels}`;

  var options = {
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'Connection': 'Keep-Alive',
      'Client-ID':TWITCH_SECRET
    }
  };

  rp(options)
    .then(function(response){
      res.send(response);
    })
    .catch(function(error){
      if(error.statusCode) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    });
}

// Search for games
export function searchGames(req, res) {
  var q = req.query.q;
  var url = `https://api.twitch.tv/kraken/search/games?q=${q}&type=suggest&live=true`;

  var options = {
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'Connection': 'Keep-Alive',
      'Client-ID':TWITCH_SECRET
    }
  };

  rp(options)
    .then(function(response){
      res.send(response);
    })
    .catch(function(error){
      if(error.statusCode) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    });
}
