(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('SettingsController', settingsCtrl);

  settingsCtrl.$inject = ['cookieSettingsFactory', 'KODI_QUALITIES'];

  function settingsCtrl(cookieSettingsFactory, KODI_QUALITIES) {
    /*jshint validthis:true */
    var vm = this;

    vm.userName = '';
    vm.kodiAddress = '';
    vm.playbackQuality = '';

    vm.playbackQualities = [
      {name : 'Best', id : KODI_QUALITIES.BEST},
      {name : '720p', id : KODI_QUALITIES.HD},
      {name : '480p', id : KODI_QUALITIES.SD},
      {name : '360p', id : KODI_QUALITIES.LOW},
      {name : 'Mobile', id : KODI_QUALITIES.MOBILE},
      {name : 'Kodi addon default', id : KODI_QUALITIES.SETTINGS_DEFAULT}
    ];

    vm.saveChanges = saveChanges;

    activate();

    function activate() {
      vm.userName = cookieSettingsFactory.getUsername();
      vm.kodiAddress = cookieSettingsFactory.getKodiAddress();
      vm.playbackQuality = getPlaybackQualityFromCookie();
    }

    function getPlaybackQualityFromCookie() {
      var quality = cookieSettingsFactory.getPlaybackQuality();
      return vm.playbackQualities.find((element) => {return element.id === quality}) ||
        vm.playbackQualities[vm.playbackQualities.length - 1];
    }

    function saveChanges() {
      cookieSettingsFactory.setUsername(vm.userName);
      cookieSettingsFactory.setKodiAddress(vm.kodiAddress);
      cookieSettingsFactory.setPlaybackQuality(vm.playbackQuality.id);
    }

  }
})();
