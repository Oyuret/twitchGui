'use strict';

angular.module('twitchguiApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/settings', {
        templateUrl: 'app/settings/settings.template.html',
        controller: 'SettingsController',
        controllerAs: 'vm'
      });
  });
