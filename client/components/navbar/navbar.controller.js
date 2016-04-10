'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title': 'Games',
      'state': 'games'
    },
    {
      'title': 'Following',
      'state': 'following'
    },
    {
      'title': 'Settings',
      'state': 'settings'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('twitchGuiApp')
  .controller('NavbarController', NavbarController);
