(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q', 'cookieSettingsFactory'];

  function kodiApiFactory($http, $q, cookieSettingsFactory) {
    var factory = {
      playStream : playStream
    };
    return factory;

    function playStream(stream) {

      var kodiAddress = cookieSettingsFactory.getKodiAddress();
      var deferred = $q.defer();

      if(kodiAddresIsValid(kodiAddress)) {
        pushPlay(stream, kodiAddress, deferred);
      } else {
        deferred.reject('Address to Kodi RPC is not correctly defined. Go to Settings and set it.');
      }

      return deferred.promise;
    }

    function kodiAddresIsValid(kodiAddress) {
      var isValid = true;

      if(kodiAddress === undefined) {
        isValid = false;
      }

      if(kodiAddress === '') {
        isValid = false;
      }

      return isValid;

    }

    function pushPlay(stream, kodiAddress, deferred) {

      var getPlayerId = {'jsonrpc': '2.0', 'method': 'Player.GetActivePlayers', 'id': 1};
      var clearVideoPlaylist = {'jsonrpc': '2.0', 'method': 'Playlist.Clear', 'params':{'playlistid':1}, 'id': 1};
      var pluginPath = 'plugin://plugin.video.twitch/playLive/' + stream + '/';
      var addPlayList = [{'jsonrpc': '2.0', 'method': 'Playlist.Add', 'params':{'playlistid':1, 'item' :{ 'file' : pluginPath }}, 'id' :1}];
      var playVideo = {'jsonrpc': '2.0', 'method': 'Player.Open', 'params':{'item':{'playlistid':1, 'position' : 0}}, 'id': 1};

      $http.post('/kodi', {query: getPlayerId, kodi: kodiAddress}, {timeout:10000})
        .then(function(idData){
          if(idData.data.result.length === 0) {
            return $http.post('/kodi', {query: clearVideoPlaylist, kodi: kodiAddress});
          } else {
            var id = idData.data.result[0].playerid;
            var stopPlayer = {'jsonrpc': '2.0', 'method': 'Player.Stop', 'params': { 'playerid': id }, 'id': 1};
            return $http.post('/kodi', {query: stopPlayer, kodi: kodiAddress});
          }
        }).then(function(){
          return $http.post('/kodi', {query: clearVideoPlaylist, kodi: kodiAddress}, {timeout:10000});
        }).then(function(){
          return $http.post('/kodi', {query: addPlayList, kodi: kodiAddress}, {timeout:10000});
        }).then(function(){
          return $http.post('/kodi',{query: playVideo, kodi: kodiAddress}, {timeout:30000});
        }).then(function(){
          deferred.resolve();
        }, function(errormsg){
          deferred.reject(angular.toJson(errormsg, true));
        });
    }

  }
})();
