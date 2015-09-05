'use strict';

angular.module('twitchguiApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Following',
      'link': '/following'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
