(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('GamesCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$filter', '$state'];

  function mainCtrl(TwitchAPI, $filter, $state) {
    /*jshint validthis:true */
    var vm = this;

    vm.games = [];
    vm.filterInput = '';

    // Loading button
    vm.loadingButtonText = 'Fetch more!';
    vm.loadingMore = false;

    vm.loadGames = loadGames;
    vm.goTo = goTo;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      loadGames();
    }

    function loadGames() {
      disableLoadMoreButton();
      TwitchAPI.getGames(vm.games.length)
        .then((games) => {
          vm.games = vm.games.concat(games);
          vm.games = $filter('unique')(vm.games, 'name');
          enableLoadMoreButton();
        }).catch(() => {
          vm.loadingButtonText = 'Failed to load more!';
          vm.loadingMore = false;
        });
    }

    function goTo(gameName) {
      $state.go("streams", {game:gameName});
    }

    function clearFilter() {
      vm.filterInput = '';
    }

    function disableLoadMoreButton() {
      vm.loadingButtonText = 'Fetching more...';
      vm.loadingMore = true;
    }

    function enableLoadMoreButton() {
      vm.loadingButtonText = 'Fetch more!';
      vm.loadingMore = false;
    }
  }

})();
