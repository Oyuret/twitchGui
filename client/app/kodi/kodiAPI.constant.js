(function(){
  'use strict';

  angular
    .module('twitchGuiApp')
    .constant('KODI_QUALITIES', {
      BEST : '0',
      HD : '1',
      SD : '2',
      LOW : '3',
      MOBILE : '4',
      SETTINGS_DEFAULT : '5'
    });

})();
