'use strict';

angular.module('twitchguiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:game', {
        templateUrl: 'app/main/streams/streams.template.html',
        controller: 'StreamsCtrl',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  });
