(function(){
  'use strict';

  angular
    .module('twitchGuiApp')
    .constant('KODI_QUALITIES', {
      SOURCE : '0',
      FULL_HD_60 : '1',
      FULL_HD_30: '2',
      HD_READY_60 : '3',
      HD_READY_30 : '4',
      HIGH_30 : '5',
      SD_30 : '6',
      MEDIUM_30 : '7',
      LOW_30 : '8',
      MOBILE_30 : '9',
      SETTINGS_DEFAULT : '10'
    });

})();
