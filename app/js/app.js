'use strict';


// Declare app level module which depends on filters, and services
angular.module('hangman', ['hangman.filters', 'hangman.services', 'hangman.directives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/level', {templateUrl: 'partials/choose_level.html', controller: LevelController}).
      //when('/game', {templateUrl: 'partials/game.html',   controller: HangmanController}).
      when('/game/:level', {templateUrl: 'partials/game.html', controller: GameController}).
      otherwise({redirectTo: '/level'});
  }]);
