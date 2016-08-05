(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchGuiApp')
    .controller('FollowingController', followingCtrl);

  followingCtrl.$inject= ['TwitchAPI', 'KodiAPI', 'cookieSettingsFactory', 'warningModal', '$filter'];

  function followingCtrl(TwitchAPI, KodiAPI, cookieSettingsFactory, warningModal, $filter) {
    /*jshint validthis:true */
    var vm = this;

    vm.streams = [];
    vm.promises = [];
    vm.kodiBusy = false;
    vm.filterInput = '';

    // following
    vm.userName = '';

    // Loading button
    vm.loadingButtonText = 'Fetch more!';
    vm.loadingMore = false;

    vm.loadStreams = loadStreams;
    vm.play = play;
    vm.clearFilter = clearFilter;

    activate();

    function activate() {
      vm.userName = cookieSettingsFactory.getUsername();
      if(vm.userName !== undefined && vm.userName !== '') {
        loadStreams();
      } else {
        vm.userName = undefined;
      }
    }

    function loadStreams() {
      disableLoadMoreButton();
      TwitchAPI.getFollowing(vm.userName, vm.streams.length)
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

    function play(name, index) {
      if(vm.kodiBusy) {
        return;
      }

      vm.kodiBusy = true;
      vm.promises[index] = KodiAPI.playStream(name);
      vm.promises[index]
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
      for(var i=0; i<streams.length; i++) {
        streams[i].index = i;
      }
    }
  }
})();
