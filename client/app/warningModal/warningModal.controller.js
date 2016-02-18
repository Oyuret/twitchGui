(function(){
  'use strict';

  angular
    .module('twitchguiApp')
    .controller('WarningModalController', warningModalCtrl);

  warningModalCtrl.$inject = ['message', '$scope'];

  function warningModalCtrl(message, $scope) {
    var vm = this;

    vm.message = message;
    vm.close = close;

    function close() {
      $scope.$close();
    }
  }

})();
