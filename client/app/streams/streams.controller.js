(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('StreamsCtrl', streamsCtrl);

  streamsCtrl.$inject = ['TwitchAPI', '$stateParams', 'KodiAPI', 'warningModal', '$filter'];

  function streamsCtrl(TwitchAPI, $stateParams, KodiAPI, warningModal, $filter) {
    /*jshint validthis:true */
    var vm = this;

    vm.game = $stateParams.game;
    vm.streams = [];
    vm.promises = [];
    vm.kodiBusy = false;
    vm.filterInput = '';

    // Loading button
    vm.loadingButtonText = 'Fetch more!';
    vm.loadingMore = false;


    vm.loadStreams = loadStreams;
    vm.play = play;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      loadStreams();
    }

    function loadStreams() {
      disableLoadMoreButton();
      TwitchAPI.getStreams(vm.game, vm.streams.length)
        .then((streams) => {
          vm.streams = vm.streams.concat(streams);
          vm.streams = $filter('unique')(vm.streams, 'name');
          addIndexToStreams(vm.streams);
          enableLoadMoreButton();
        }).catch(() => {
          vm.loadingButtonText = 'Failed to load more!';
          vm.loadingMore = false;
        });
    }

    function play(stream) {
      if(vm.kodiBusy) {
        return;
      }

      vm.kodiBusy = true;
      vm.promises[stream.index] = KodiAPI.playStream(stream);
      vm.promises[stream.index]
        .then(() => vm.kodiBusy = false)
        .catch((error) => {
          warningModal.warn(error).result
            .finally(() => vm.kodiBusy = false);
        });
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

    function addIndexToStreams(streams) {
      for(let i=0; i<streams.length; i++) {
        streams[i].index = i;
      }
    }
  }

})();
