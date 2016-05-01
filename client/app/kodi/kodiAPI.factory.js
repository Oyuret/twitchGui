(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q', 'cookieSettingsFactory', 'KODI_QUALITIES'];

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

      var playStreamPath = `plugin://plugin.video.twitch/playLive/${stream}/${playbackQuality}`;
      var playVideoRequestData = {
        'jsonrpc': '2.0',
        'method': 'Player.Open',
        'params':{'item':{'file' : playStreamPath }},
        'id': 1
      };

      $http.post('/api/kodi',{query: playVideoRequestData, kodi: kodiAddress}, {timeout:30000})
        .then(function(){
          deferred.resolve();
        })
        .catch(function(errorMsg){
          deferred.reject(errorMsg);
        });
    }
  }
})();
