(function(){
  'use strict';

  angular
    .module('twitchguiApp')
    .factory('warningModal', warningModalFactory);

  warningModalFactory.$inject = ['$modal'];

  function warningModalFactory($modal) {
    var factory = {
      warn : warn
    };
    return factory;

    function warn(message) {

      return $modal.open({
        templateUrl : 'app/warningModal/warningModal.template.html',
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
