'use strict';

angular.module('twitchGuiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.template.html',
        controller: 'SettingsController',
        controllerAs: 'vm'
      });
  });
