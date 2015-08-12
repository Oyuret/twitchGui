(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q'];

  function kodiApiFactory($http,$q) {
    var factory = {
      playStream : playStream
    };
    return factory;

    function playStream(stream) {
      var deferred = $q.defer();

      var getPlayerId = {'jsonrpc': '2.0', 'method': 'Player.GetActivePlayers', 'id': 1};
      var clearVideoPlaylist = {'jsonrpc': '2.0', 'method': 'Playlist.Clear', 'params':{'playlistid':1}, 'id': 1};
      var pluginPath = 'plugin://plugin.video.twitch/playLive/' + stream + '/';
      var addPlayList = [{'jsonrpc': '2.0', 'method': 'Playlist.Add', 'params':{'playlistid':1, 'item' :{ 'file' : pluginPath }}, 'id' :1}];
      var playVideo = {'jsonrpc': '2.0', 'method': 'Player.Open', 'params':{'item':{'playlistid':1, 'position' : 0}}, 'id': 1};

      $http.post('/kodi', {query: getPlayerId})
        .then(function(idData){
          if(idData.data.result.length === 0) {
            return $http.post('/kodi', {query: clearVideoPlaylist});
          } else {
            var id = idData.data.result[0].playerid;
            var stopPlayer = {'jsonrpc': '2.0', 'method': 'Player.Stop', 'params': { 'playerid': id }, 'id': 1};
            return $http.post('/kodi', {query: stopPlayer});
          }
        }).then(function(){
          return $http.post('/kodi', {query: clearVideoPlaylist});
        }).then(function(){
          return $http.post('/kodi', {query: addPlayList});
        }).then(function(){
          return $http.post('/kodi',{query: playVideo});
        }).then(function(){
          deferred.resolve();
        }, function(errormsg){
          deferred.reject(errormsg);
        });

      return deferred.promise;
    }

  }
})();
