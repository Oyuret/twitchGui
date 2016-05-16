'use strict';

var express = require('express');
var controller = require('./twitch.controller');

var router = express.Router();

router.get('/games', controller.games);
router.get('/streams', controller.streams);
router.get('/following', controller.following);
router.get('/followedStreams', controller.followedStreams);
router.get('/searchGames', controller.searchGames);

module.exports = router;
