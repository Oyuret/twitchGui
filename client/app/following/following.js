'use strict';

angular.module('twitchGuiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('following', {
        url: '/following',
        templateUrl: 'app/following/following.template.html',
        controller: 'FollowingController',
        controllerAs: 'vm'
      });
  });
