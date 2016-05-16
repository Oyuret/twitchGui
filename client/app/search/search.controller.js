(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('SearchCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$location', 'warningModal', '$stateParams'];

  function mainCtrl(TwitchAPI, $location, warningModal, $stateParams) {
    /*jshint validthis:true */
    var vm = this;

    vm.games = [];
    vm.searchInput = '';

    vm.goToGame = goToGame;
    vm.search = search;

    let searchTerm = $stateParams.input || '';

    activate();

    function activate() {
      vm.searchInput = decodeURIComponent(searchTerm);
      querySearch();
    }

    function goToGame(url) {
      $location.path(url);
    }

    function search() {
      if(vm.searchInput === '') {
        return;
      }

      $location.path(`/search/${vm.searchInput}`).replace();
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
