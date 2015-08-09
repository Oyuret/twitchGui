(function(){
  'use strict';

  angular
    .module('twitchguiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q', '$timeout'];

  function kodiApiFactory($http,$q, $timeout) {
    var factory = {
      playStream : playStream
    };
    return factory;

    function playStream(stream) {
      var deferred = $q.defer();
      var idQuery = {"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1};

      $http.post('/kodi', {query: idQuery})
        .success(function(idData) {

          // The player was stopped
          if(idData.result.length === 0) {
            // clear the playlist
            var clearVideoPlaylist = '{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":1}, "id": 1}';
            $http.post('/kodi',{query: clearVideoPlaylist})
              .success(function(data){
                var pluginPath = 'plugin://plugin.video.twitch/playLive/' + stream + '/';
                var play = [{"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : pluginPath }}, "id" :1}];

                $http.post('/kodi', {query: play})
                  .success(function(data){
                    var playVideo = {"jsonrpc": "2.0", "method": "Player.Open", "params":{"item":{"playlistid":1, "position" : 0}}, "id": 1};

                    $http.post('/kodi', {query: playVideo})
                      .success(function(data){
                        deferred.resolve(data);
                      });
                  }).error(function(){
                    deferred.resolve();
                  })

              }).error(function(data){
                deferred.resolve();
              });
            return;
          }

          var id = idData.result[0].playerid;

          // Stop the player
          var stopQuery = {"jsonrpc": "2.0", "method": "Player.Stop", "params": { "playerid": id }, "id": 1};
          $http.post('/kodi', {query : stopQuery})
            .success(function(data) {

              // clear the playlist
              var clearVideoPlaylist = '{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":1}, "id": 1}';
              //var clearAudioPlaylist = '{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":0}, "id": 1}';
              $http.post('/kodi',{query: clearVideoPlaylist})
                .success(function(data){
                  var pluginPath = 'plugin://plugin.video.twitch/playLive/' + stream + '/';
                  var play = {"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : pluginPath }}, "id" :1};

                  $http.post('/kodi', {query: play})
                    .success(function(data){
                      var playVideo = {"jsonrpc": "2.0", "method": "Player.Open", "params":{"item":{"playlistid":1, "position" : 0}}, "id": 1};

                      $http.post('/kodi', {query: playVideo})
                        .success(function(data){
                          deferred.resolve(data);
                      });

                    }).error(function(){
                      deferred.resolve();
                    })

                }).error(function(data){
                  deferred.resolve();
                });

            }).error(function(){
              deferred.resolve();
            });

        }).error(function(){
          deferred.resolve('Failed');
        });

      return deferred.promise;
    }

  }
})();
