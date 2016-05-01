(function(){
  'use strict';

  angular
    .module('twitchGuiApp')
    .directive('streamCard', streamCardDirective);

  streamCardDirective.$inject = [];

  function streamCardDirective() {
    var directive = {
      templateUrl: 'app/streamCard/streamCard.template.html',
      restrict: 'E',
      scope: {
        streamPromise: '=',
        displayName: '=',
        picture: '=',
        language: '=',
        status: '=',
        game: '=',
        viewers: '=',
        online: '='
      }
    };
    return directive;
  }

})();
