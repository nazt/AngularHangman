'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/view1', {templateUrl: 'partials/partial1.html',   controller: MyController}).
      when('/level', {templateUrl: 'partials/choose_level.html',   controller: HangmanController}).
      //when('/game', {templateUrl: 'partials/game.html',   controller: HangmanController}).
      when('/game/:level', {templateUrl: 'partials/game.html',   controller: HangmanController}).
      otherwise({redirectTo: '/level'});
  }]);
