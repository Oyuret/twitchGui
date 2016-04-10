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
      setKodiAddress : setKodiAddress
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

    function getExpireDate() {
      var now = new Date();
      return new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
    }
  }
})();
