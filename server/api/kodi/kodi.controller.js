/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kodi              ->  index
 */

'use strict';
var rp = require('request-promise');

// Makes a call to Kodi JSON-RPC
export function index(req, res) {
  var query = req.body.query;
  var kodiAddr = req.body.kodi;

  var options = {
    method: 'POST',
    uri: kodiAddr,
    body: query,
    json: true
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
