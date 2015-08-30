'use strict';

angular.module('twitchguiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/games/games.html',
        controller: 'GamesCtrl',
        controllerAs: 'vm'
      });
  });
