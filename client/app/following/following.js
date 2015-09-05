'use strict';

angular.module('twitchguiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/following', {
        templateUrl: 'app/following/following.template.html',
        controller: 'FollowingController',
        controllerAs: 'vm'
      });
  });
