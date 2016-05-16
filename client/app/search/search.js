'use strict';

angular.module('twitchGuiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:input',
        templateUrl: 'app/search/search.template.html',
        controller: 'SearchCtrl',
        controllerAs: 'vm'
      });
  });
