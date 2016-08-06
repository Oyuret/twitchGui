(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('GamesCtrl', mainCtrl);

  mainCtrl.$inject = [
    'TwitchAPI', '$state', '$anchorScroll',
    '$scope', 'GamesState',
    '$filter', '$timeout'];

  function mainCtrl(TwitchAPI, $state, $anchorScroll, $scope, GamesState, $filter, $timeout) {
    /*jshint validthis:true */
    var vm = this;

    vm.games = [];
    vm.filterInput = '';

    // Loading button
    vm.loadingButtonText = 'Fetch more!';
    vm.loadingMore = false;

    vm.loadGames = loadGames;
    vm.reloadGames = reloadGames;
    vm.goTo = goTo;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      if(GamesState.hasSavedState()) {
        restorePageState();
      } else {
        loadGames();
      }
    }

    function restorePageState() {
      let savedState = GamesState.getSavedState();
      vm.games = savedState.games;
      $timeout(() => $anchorScroll(savedState.scrollPosition));
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

    function reloadGames() {
      vm.games = [];
      loadGames();
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

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
       if(toState.name === "streams") {
         GamesState.saveState({games: vm.games, scrollPosition : toParams.game});
       } else {
         GamesState.saveState({games: vm.games, scrollPosition : undefined});
       }
    });
  }

})();
