(function(){
  'use strict';
  /*jshint latedef: nofunc */

  angular
    .module('twitchguiApp')
    .controller('FollowingController', followingCtrl);

  followingCtrl.$inject= ['TwitchAPI', 'KodiAPI', '$cookies'];

  function followingCtrl(TwitchAPI, KodiAPI, $cookies) {
    /*jshint validthis:true */
    var vm = this;

    vm.streams = [];
    vm.nextUrl = '';
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
      vm.userName = $cookies.get('twitchUserName');
      if(vm.userName !== undefined) {
        loadStreams();
      }
    }

    function loadStreams() {

      vm.loadingButtonText = 'Fetching more...';
      vm.loadingMore = true;
      TwitchAPI.getFollowing(vm.userName, vm.nextUrl)
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
