(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .controller('MainCtrl', mainCtrl);

  mainCtrl.$inject = ['TwitchAPI', '$location'];

  function mainCtrl(TwitchAPI, $location) {
    /*jshint validthis:true */
    var vm = this;

    vm.games = [];
    vm.nextUrl = '';
    vm.filterInput = '';

    vm.loadGames = loadGames;
    vm.goTo = goTo;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      loadGames();
    }

    function loadGames() {
      TwitchAPI.getGames(vm.nextUrl)
        .then(function(games) {
          vm.nextUrl = games._links.next;
          vm.games = vm.games.concat(games.top);
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
