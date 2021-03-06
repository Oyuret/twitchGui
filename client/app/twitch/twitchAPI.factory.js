(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('TwitchAPI', twitchApiFactory);

  twitchApiFactory.$inject = ['$http', '$q'];

  function twitchApiFactory($http, $q) {
    let factory = {
      getGames : getGames,
      getStreams : getStreams,
      getFollowing : getFollowing,
      searchGames : searchGames
    };
    return factory;

    function getGames(offset) {
      let deferred = $q.defer();

      $http.get(`/api/twitch/games?offset=${offset}`)
        .then((gamesData) => {
          let games = [];
          for(let gameData of gamesData.data.top) {
            let game = {
              name : gameData.game.name,
              channels : gameData.channels,
              viewers : gameData.viewers,
              picture : gameData.game.box.medium
            };
            games.push(game)
          }

          deferred.resolve(games);
        }).catch((error) => {
          console.error("Failed to fetch games");
          console.error(error);
          deferred.reject();
        });

      return deferred.promise;
    }

    function getStreams(game, offset) {
      let deferred = $q.defer();

      $http.get(`/api/twitch/streams?game=${game}&offset=${offset}`)
        .then((streamsData) => {
          var streams = [];
          for(let streamData of streamsData.data.streams) {
            let stream = {
              channelId: streamData.channel._id,
              name : streamData.channel.name,
              displayName : streamData.channel.display_name,
              picture : streamData.preview.medium,
              status : streamData.channel.status,
              game: streamData.channel.game,
              language : streamData.channel.language,
              viewers : streamData.viewers,
              online: true
            };
            streams.push(stream);
          }

          deferred.resolve(streams);
        }).catch((error) => {
          console.log("Failed to fetch streams");
          console.log(error);
          deferred.reject();
        });

      return deferred.promise;
    }

    function getFollowing(username, offset) {
      let deferred = $q.defer();
      let streamsMap = new Map();

      $http.get(`/api/twitch/following?username=${username}&offset=${offset}`)
        .then((followingData) => {
          for(let following of followingData.data.follows) {
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

          var channels = followingData.data.follows.map((item) => { return item.channel.name; }).join(',');
          return $http.get(`/api/twitch/followedStreams?offset=0&channels=${channels}`);
        }).then((streamsData) => {
          for(let streamData of streamsData.data.streams) {
            let stream = {
              channelId: streamData.channel._id,
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

          let streams = [];
          streamsMap.forEach((stream) => streams.push(stream));
          deferred.resolve(streams);
        }).catch((error) => {
          console.log("Failed to fetch followed streams");
          console.log(error);
          deferred.reject();
        });

      return deferred.promise;
    }

    function searchGames(searchTerm) {
      let deferred = $q.defer();

      $http.get(`/api/twitch/searchGames?q=${searchTerm}`)
        .then((gamesData) => {
          let games = [];
          for(let gameData of gamesData.data.games) {
            let game = {
              name : gameData.name,
              channels : gameData.channels,
              viewers : gameData.viewers,
              picture : gameData.box.medium
            };
            games.push(game)
          }

          deferred.resolve(games);
        }).catch((error) => {
          console.error("Failed to make a search");
          console.error(error);
          deferred.reject();
        });

      return deferred.promise;
    }
  }
})();
