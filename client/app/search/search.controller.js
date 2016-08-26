(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('SearchCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$state', 'warningModal', '$stateParams'];

  function mainCtrl(TwitchAPI, $state, warningModal, $stateParams) {
    /*jshint validthis:true */
    var vm = this;

    vm.games = [];
    vm.searchInput = '';

    vm.search = search;

    let searchTerm = $stateParams.input || '';

    activate();

    function activate() {
      vm.searchInput = decodeURIComponent(searchTerm);
      querySearch();
    }

    function search() {
      if(vm.searchInput === '') {
        return;
      }

      $state.go("search", {input : vm.searchInput}, {location: "replace"});
    }

    function querySearch() {
      if(vm.searchInput === '') {
        return;
      }

      vm.games = [];
      TwitchAPI.searchGames(vm.searchInput)
        .then((games) => {
          vm.games = games;
        }).catch((error) => {
        warningModal.warn(error);
      });
    }

  }

})();
