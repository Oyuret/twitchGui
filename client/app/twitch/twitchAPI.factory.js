(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .factory('TwitchAPI', twitchApiFactory);

  twitchApiFactory.$inject = ['$http', '$q', '$cookies'];

  function twitchApiFactory($http, $q, $cookies) {
    var factory = {
      getGames : getGames,
      getStreams : getStreams,
      getFollowing : getFollowing
    };
    return factory;

    function getGames(next) {
      var deferred = $q.defer();
      var url = next === '' ? 'https://api.twitch.tv/kraken/games/top?limit=50&offset=0' : next;

      $http.post('/twitch', {url : url})
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

      $http.post('/twitch', {url : url})
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

      $http.post('/twitch', {url: url})
        .then(function(following){

          // set the next link
          response._links = following.data._links;

          // create the options to send to next request
          var options = '?channel=';
          var length = following.data.follows.length;
          for(var i=0; i<length-1; i++) {
            options += following.data.follows[i].channel.name;
            options += ',';
          }
          options += following.data.follows[length-1].channel.name;

          // get the streams which are live
          var streamsUrl = 'https://api.twitch.tv/kraken/streams' + options + '&limit=35&offset=0';
          console.log(streamsUrl);
          return $http.post('/twitch', {url : streamsUrl});

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
