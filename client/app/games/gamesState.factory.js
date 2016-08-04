(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .factory('GamesState', gamesStateFactory);

  gamesStateFactory.$inject = [];

  function gamesStateFactory() {
    var vm = this;
    vm.savedState = undefined;

    let factory = {
      saveState : saveState,
      getSavedState : getSavedState,
      hasSavedState : hasSavedState
    };
    return factory;

    function saveState(savedState) {
      vm.savedState = savedState;
    }

    function getSavedState() {
      return vm.savedState;
    }

    function hasSavedState() {
      return angular.isDefined(vm.savedState);
    }

  }
})();
