/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kodi              ->  index
 */

'use strict';
var requestify = require('requestify');

// Makes a call to Kodi JSON-RPC
export function index(req, res) {
  var query = req.body.query;
  var kodiAddr = req.body.kodi;

  requestify
    .post(kodiAddr, query, {headers:{'Connection': 'Keep-Alive'}})
    .then(function(response){
      res.send(response.getBody());
    }).catch(function(error){
      res.status(400).end(error);
    });
}
