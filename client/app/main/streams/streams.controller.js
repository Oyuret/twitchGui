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


    vm.loadStreams = loadStreams;
    vm.play = play;

    activate();

    function activate() {
      loadStreams();
    }

    function loadStreams() {
      TwitchAPI.getStreams(vm.game, vm.nextUrl)
        .then(function(streams) {
          vm.nextUrl = streams._links.next;
          vm.streams = vm.streams.concat(streams.streams);
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
  }

})();
