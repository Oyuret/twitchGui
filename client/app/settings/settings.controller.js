(function(){
  'use strict';

  angular
    .module('twitchguiApp')
    .controller('SettingsController', settingsCtrl);

  settingsCtrl.$inject = ['$cookies'];

  function settingsCtrl($cookies) {
    var vm = this;

    vm.userName = '';

    vm.setUsername = setUsername;

    activate();

    function activate() {
      vm.userName = $cookies.get('twitchUserName');
    }

    function setUsername() {
      var now = new Date();
      var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
      $cookies.put('twitchUserName', vm.userName, {expires: exp});
    }


  }
})();