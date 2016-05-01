(function(){
  'use strict';

  angular
    .module('twitchGuiApp')
    .factory('cookieSettingsFactory', cookieSettingsFactory);

  cookieSettingsFactory.$inject = ['$cookies'];

  function cookieSettingsFactory($cookies)  {
    var factory = {
      getUsername : getUsername,
      setUsername : setUsername,
      getKodiAddress : getKodiAddress,
      setKodiAddress : setKodiAddress,
      getPlaybackQuality : getPlaybackQuality,
      setPlaybackQuality : setPlaybackQuality
    };
    return factory;

    function getUsername() {
      return $cookies.get('twitchUserName');
    }

    function setUsername(userName) {
      var expireDate = getExpireDate();
      $cookies.put('twitchUserName', userName, {expires: expireDate});
    }

    function getKodiAddress() {
      return $cookies.get('kodiAddress');
    }

    function setKodiAddress(kodiAddress) {
      var expireDate = getExpireDate();
      $cookies.put('kodiAddress', kodiAddress, {expires: expireDate});
    }

    function getPlaybackQuality() {
      return $cookies.get('quality');
    }

    function setPlaybackQuality(quality) {
      var expireDate = getExpireDate();
      $cookies.put('quality', quality, {expires: expireDate})
    }

    function getExpireDate() {
      var now = new Date();
      return new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
    }
  }
})();
