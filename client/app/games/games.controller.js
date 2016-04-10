(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('GamesCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$location'];

  function mainCtrl(TwitchAPI, $location) {
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

      vm.loadingButtonText = 'Fetching more...';
      vm.loadingMore = true;
      TwitchAPI.getGames(vm.games.length)
        .then(function(games) {
          vm.games = vm.games.concat(games.top);
          vm.loadingButtonText = 'Fetch more!';
          vm.loadingMore = false;
        }, function(){
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
  }

})();
