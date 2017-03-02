'use strict';

angular.module('twitchGuiApp', [
  'twitchGuiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angular-busy',
  'angular.filter',
  'angular.backtop',
  'tmh.dynamicLocale'
])
  .config(function($urlRouterProvider, $locationProvider, tmhDynamicLocaleProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_sv-se.js');
    tmhDynamicLocaleProvider.defaultLocale('sv-se');
  });
