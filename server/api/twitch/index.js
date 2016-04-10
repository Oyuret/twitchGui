'use strict';

var express = require('express');
var controller = require('./twitch.controller');

var router = express.Router();

router.get('/games', controller.games);
router.get('/streams', controller.streams);

module.exports = router;
