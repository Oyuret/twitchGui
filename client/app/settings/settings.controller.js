(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .controller('SettingsController', settingsCtrl);

  settingsCtrl.$inject = ['cookieSettingsFactory'];

  function settingsCtrl(cookieSettingsFactory) {
    /*jshint validthis:true */
    var vm = this;

    vm.userName = '';
    vm.kodiAddress = '';

    vm.saveChanges = saveChanges;

    activate();

    function activate() {
      vm.userName = cookieSettingsFactory.getUsername();
      vm.kodiAddress = cookieSettingsFactory.getKodiAddress();
    }

    function saveChanges() {
      cookieSettingsFactory.setUsername(vm.userName);
      cookieSettingsFactory.setKodiAddress(vm.kodiAddress);
    }


  }
})();
