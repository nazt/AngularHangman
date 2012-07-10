'use strict';

/* Directives */
var hangmanDirectives = angular.module('hangman.directives', []);

hangmanDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}]);

hangmanDirectives.directive('myClick', ['$parse', function($parse) {
	return function (scope, iElement, iAttrs) {
		var fn = $parse(iAttrs.myClick);
		iElement.bind('click', function(evt){
			var self = this;
			scope.clickVar = 'clicked';
			scope.$apply(function() { fn(scope, {$event: evt}); });
			iElement.unbind();
		});
	};
}]);;


