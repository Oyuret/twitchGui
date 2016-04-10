'use strict';

angular.module('twitchGuiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('games', {
        url: '/',
        templateUrl: 'app/games/games.template.html',
        controller: 'GamesCtrl',
        controllerAs: 'vm'
      });
  });
