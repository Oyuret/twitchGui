(function(){
  'use strict';

  angular
    .module('twitchGuiApp')
    .factory('warningModal', warningModalFactory);

  warningModalFactory.$inject = ['$uibModal'];

  function warningModalFactory($uibModal) {
    var factory = {
      warn : warn
    };
    return factory;

    function warn(message) {

      return $uibModal.open({
        templateUrl : 'components/warningModal/warningModal.template.html',
        controller : 'WarningModalController',
        controllerAs: 'vm',
        resolve : {
          message : function() {
            return message;
          }
        }
      });
    }
  }
})();
