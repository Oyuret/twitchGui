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

    function getGames(next) {
      var deferred = $q.defer();
      var url = next === '' ? 'https://api.twitch.tv/kraken/games/top?limit=50&offset=0' : next;

      $http.post('/api/twitch', {url : url})
        .then(function(games){
          deferred.resolve(games.data);
        }, function(){
          deferred.reject('Failed to fetch games');
        });

      return deferred.promise;

    }

    function getStreams(game, next) {
      var deferred = $q.defer();
      var url = next === '' ? 'https://api.twitch.tv/kraken/streams?limit=25&offset=0&game='+game : next;

      $http.post('/api/twitch', {url : url})
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
