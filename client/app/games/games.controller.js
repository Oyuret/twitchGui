(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('GamesCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$location', '$filter'];

  function mainCtrl(TwitchAPI, $location, $filter) {
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

    function goTo(url) {
      $location.path(url);
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
