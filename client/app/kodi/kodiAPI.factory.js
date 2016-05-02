(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('KodiAPI', kodiApiFactory);

  kodiApiFactory.$inject = ['$http', '$q', 'cookieSettingsFactory', 'KODI_QUALITIES'];

  function kodiApiFactory($http, $q, cookieSettingsFactory, KODI_QUALITIES) {
    let factory = {
      playStream : playStream
    };
    return factory;

    function playStream(stream) {
      let kodiAddress = cookieSettingsFactory.getKodiAddress();
      let playbackQuality = cookieSettingsFactory.getPlaybackQuality() || KODI_QUALITIES.SETTINGS_DEFAULT;
      let deferred = $q.defer();

      if(kodiAddressIsValid(kodiAddress)) {
        pushPlay(stream, kodiAddress, playbackQuality, deferred);
      } else {
        deferred.reject('Address to Kodi RPC is not correctly defined. Go to Settings and set it.');
      }

      return deferred.promise;
    }

    function kodiAddressIsValid(kodiAddress) {
      let isValid = true;

      if(kodiAddress === undefined) {
        isValid = false;
      }

      if(kodiAddress === '') {
        isValid = false;
      }

      return isValid;
    }

    function pushPlay(stream, kodiAddress, playbackQuality, deferred) {
      let playStreamPath = `plugin://plugin.video.twitch/playLive/${stream}/${playbackQuality}`;
      let playVideoRequestData = {
        'jsonrpc': '2.0',
        'method': 'Player.Open',
        'params':{'item':{'file' : playStreamPath }},
        'id': 1
      };

      $http.post('/api/kodi',{query: playVideoRequestData, kodi: kodiAddress}, {timeout:5000})
        .then(() => deferred.resolve())
        .catch((errorMsg) => deferred.reject(errorMsg));
    }
  }
})();
