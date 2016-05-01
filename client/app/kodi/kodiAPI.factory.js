(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q', 'cookieSettingsFactory'];

  function kodiApiFactory($http, $q, cookieSettingsFactory, KODI_QUALITIES) {
    var factory = {
      playStream : playStream
    };

    return factory;

    function playStream(stream) {
      var kodiAddress = cookieSettingsFactory.getKodiAddress();
      var playbackQuality = cookieSettingsFactory.getPlaybackQuality() || KODI_QUALITIES.SETTINGS_DEFAULT;
      var deferred = $q.defer();

      if(kodiAddressIsValid(kodiAddress)) {
        pushPlay(stream, kodiAddress, playbackQuality, deferred);
      } else {
        deferred.reject('Address to Kodi RPC is not correctly defined. Go to Settings and set it.');
      }

      return deferred.promise;
    }

    function kodiAddressIsValid(kodiAddress) {
      var isValid = true;

      if(kodiAddress === undefined) {
        isValid = false;
      }

      if(kodiAddress === '') {
        isValid = false;
      }

      return isValid;
    }

    function pushPlay(stream, kodiAddress, playbackQuality, deferred) {

      getPlayerId(kodiAddress)
        .then(function(getPlayerIdResponse){
          return stopPlayerIfRunning(getPlayerIdResponse, kodiAddress);
        }).then(function(){
          return clearVideoPlaylist(kodiAddress);
        }).then(function(){
          return addToPlaylist(stream, playbackQuality, kodiAddress);
        }).then(function(){
          return playVideo(kodiAddress);
        }).then(function(){
          deferred.resolve();
        }).catch(function(errorMsg){
          deferred.reject(errorMsg);
        });
    }

    function getPlayerId(kodiAddress) {
      var getPlayerIdRequestData = {'jsonrpc': '2.0', 'method': 'Player.GetActivePlayers', 'id': 1};
      return $http.post('/api/kodi', {query: getPlayerIdRequestData, kodi: kodiAddress}, {timeout:10000});
    }

    function stopPlayerIfRunning(playerIdResponse, kodiAddress) {

      if(playerIsRunning(playerIdResponse)) {
        var id = playerIdResponse.data.result[0].playerid;
        var stopPlayerRequestData = {'jsonrpc': '2.0', 'method': 'Player.Stop', 'params': { 'playerid': id }, 'id': 1};

        return $http.post('/api/kodi', {query: stopPlayerRequestData, kodi: kodiAddress});
      } else {
        return $q.resolve();
      }
    }

    function playerIsRunning(playerIdResponse) {
      return playerIdResponse.data.result.length !== 0;
    }

    function clearVideoPlaylist(kodiAddress) {
      var clearVideoPlaylistRequestData = {
        'jsonrpc': '2.0',
        'method': 'Playlist.Clear',
        'params':{'playlistid':1},
        'id': 1
      };
      return $http.post('/api/kodi', {query: clearVideoPlaylistRequestData, kodi: kodiAddress}, {timeout:10000});
    }

    function addToPlaylist(stream,  playbackQuality, kodiAddress) {
      var pluginPath = `plugin://plugin.video.twitch/playLive/${stream}/${playbackQuality}`;
      var addToPlaylistRequestData = [{
        'jsonrpc': '2.0',
        'method': 'Playlist.Add',
        'params':{'playlistid':1, 'item' :{ 'file' : pluginPath }},
        'id' :1
      }];

      return $http.post('/api/kodi', {query: addToPlaylistRequestData, kodi: kodiAddress}, {timeout:10000});
    }

    function playVideo(kodiAddress) {

      var playVideoRequestData = {
        'jsonrpc': '2.0',
        'method': 'Player.Open',
        'params':{'item':{'playlistid':1, 'position' : 0}},
        'id': 1
      };

      return $http.post('/api/kodi',{query: playVideoRequestData, kodi: kodiAddress}, {timeout:30000});
    }

  }
})();
