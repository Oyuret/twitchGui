(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('TwitchAPI', twitchApiFactory);

  twitchApiFactory.$inject = ['$http', '$q'];

  function twitchApiFactory($http, $q) {
    var factory = {
      getGames : getGames,
      getStreams : getStreams,
      getFollowing : getFollowing
    };
    return factory;

    function getGames(offset) {
      var deferred = $q.defer();

      $http.get('/api/twitch/games?offset=' + offset)
        .then(function(gamesData){
          var games = [];

          for(var gameData of gamesData.data.top) {
            let game = {
              name : gameData.game.name,
              channels : gameData.channels,
              viewers : gameData.viewers,
              picture : gameData.game.box.medium
            };

            games.push(game)
          }

          deferred.resolve(games);
        }, function(){
          deferred.reject('Failed to fetch games');
        });

      return deferred.promise;

    }

    function getStreams(game, offset) {
      var deferred = $q.defer();

      $http.get('/api/twitch/streams?game=' + game + '&offset=' + offset)
        .then(function(streamsData){
          var streams = [];

          for(var streamData of streamsData.data.streams) {
            let stream = {
              name : streamData.channel.name,
              displayName : streamData.channel.display_name,
              picture : streamData.preview.medium,
              status : streamData.channel.status,
              language : streamData.channel.language,
              viewers : streamData.viewers
            };
            streams.push(stream);
          }

          deferred.resolve(streams);
        }, function(){
          deferred.reject('Failed to fetch streams');
        });

      return deferred.promise;
    }

    function getFollowing(username, offset) {
      var deferred = $q.defer();
      var streams = [];

      $http.get('/api/twitch/following?username=' + username + '&offset=' + offset)
        .then(function(followingData){

          var streamsMap = new Map();
          for(var following of followingData.data.follows) {

            let channel = {
              name : following.channel.name,
              displayName : following.channel.display_name,
              picture: following.channel.video_banner,
              status: following.channel.status,
              game : following.channel.game,
              language : following.channel.language,
              viewers : 0,
              online : false
            };

            streamsMap.set(channel.name, channel);
          }
          
          var channels = followingData.data.follows.map(function(item) { return item.channel.name; }).join(',');
          $http.get('/api/twitch/followedStreams?offset=0&channels=' + channels)
            .then(function(streamsData){

              for(var streamData of streamsData.data.streams) {
                let stream = {
                  name : streamData.channel.name,
                  displayName : streamData.channel.display_name,
                  picture : streamData.preview.medium,
                  status : streamData.channel.status,
                  game : streamData.game,
                  language : streamData.channel.language,
                  viewers : streamData.viewers,
                  online : true
                };

                streamsMap.set(stream.name, stream);
              }

              streamsMap.forEach(function(stream){
                streams.push(stream);
              });

              deferred.resolve(streams);

            }, function(){
              deferred.reject('Failed to fetch followed streams');
            });


        }, function(){
          deferred.reject('Failed to fetch followed streams');
        });



      return deferred.promise;
    }
  }
})();
