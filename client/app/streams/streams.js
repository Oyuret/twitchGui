'use strict';

angular.module('twitchGuiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('streams', {
        url: '/game/:game',
        templateUrl: 'app/streams/streams.template.html',
        controller: 'StreamsCtrl',
        controllerAs: 'vm'
      });
  });
