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
        .then(function(channels){
          deferred.resolve(channels.data);
        }, function(){
          deferred.reject('Failed to fetch streams');
        });

      return deferred.promise;
    }

    function getFollowing(username, next) {
      var deferred = $q.defer();
      var url = next === '' ? 'https://api.twitch.tv/kraken/users/' +
                              username + '/follows/channels?limit=35&offset=0&sortby=created_at': next;
      var response = {};

      $http.post('/api/twitch', {url: url})
        .then(function(following){

          // check if we got any more left
          if(!following.data.follows || following.data.follows.length === 0) {
            return $q.reject('No more channels left');
          }
          // set the next link
          response._links = following.data._links;

          // create the options to send to next request
          var channels = following.data.follows.map(function(item) { return item.channel.name; }).join(',');
          var options = '?channel=' + channels;

          // get the streams which are live
          var streamsUrl = 'https://api.twitch.tv/kraken/streams' + options + '&limit=35&offset=0';
          return $http.post('/api/twitch', {url : streamsUrl});

        }).then(function(streams){
          response.streams = streams.data.streams;
          deferred.resolve(response);
        },
        function(){
          deferred.reject('Failed to fetch followed streams');
        });

      return deferred.promise;
    }
  }
})();
