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
      {name : 'Source', id : KODI_QUALITIES.SOURCE},
      {name : '1080p60', id : KODI_QUALITIES.FULL_HD_60},
      {name : '1080p30', id : KODI_QUALITIES.FULL_HD_30},
      {name : '720p60', id : KODI_QUALITIES.HD_READY_60},
      {name : '720p30', id : KODI_QUALITIES.HD_READY_30},
      {name : '540p30', id : KODI_QUALITIES.HIGH_30},
      {name : '480p30', id : KODI_QUALITIES.SD_30},
      {name : '360p30', id : KODI_QUALITIES.MEDIUM_30},
      {name : '240p30', id : KODI_QUALITIES.LOW_30},
      {name : '144p30', id : KODI_QUALITIES.MOBILE_30},
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
