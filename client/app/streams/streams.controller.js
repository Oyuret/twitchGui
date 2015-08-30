(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .controller('StreamsCtrl', streamsCtrl);

  streamsCtrl.$inject = ['TwitchAPI', '$routeParams', 'KodiAPI'];

  function streamsCtrl(TwitchAPI, $routeParams, KodiAPI) {
    /*jshint validthis:true */
    var vm = this;

    vm.game = $routeParams.game;
    vm.streams = [];
    vm.nextUrl = '';
    vm.promises = [];
    vm.kodiBusy = false;
    vm.filterInput = '';

    // Loading button
    vm.loadingButtonText = "Fetch more!";
    vm.loadingMore = false;


    vm.loadStreams = loadStreams;
    vm.play = play;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      loadStreams();
    }

    function loadStreams() {

      vm.loadingButtonText = 'Fetching more...';
      vm.loadingMore = true;
      TwitchAPI.getStreams(vm.game, vm.nextUrl)
        .then(function(streams) {
          vm.nextUrl = streams._links.next;
          vm.streams = vm.streams.concat(streams.streams);
          vm.loadingButtonText = 'Fetch more!';
          vm.loadingMore = false;
        }, function(){
          vm.loadingButtonText = 'Failed to load more!';
          vm.loadingMore = false;
        });
    }

    function play(name, index) {
      if(vm.kodiBusy) {
        return;
      }

      vm.kodiBusy = true;
      vm.promises[index] = KodiAPI.playStream(name);
      vm.promises[index].then(function() {
        vm.kodiBusy = false;
      }, function(error){
        console.log(error);
        vm.kodiBusy = false;
      });

    }

    function clearFilter() {
      vm.filterInput = '';
    }
  }

})();
