'use strict';

angular.module('twitchGuiApp', [
  'twitchGuiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'cgBusy',
  'angular.filter',
  'angular.backtop'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
