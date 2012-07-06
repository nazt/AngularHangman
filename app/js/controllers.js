'use strict';

/* Controllers */

function HangmanController($scope, $log, $routeParams) {
	$scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
	$scope.level = $routeParams.level || 0;
  $scope.canvasId = "stage";
  $scope.count = 0;
  $scope.nat = "Nat";


  // Construct
  !function() {
    var t = new Array($scope.level*3);

    $scope.word = t.join('_');
    if ($scope.level < 1 ) {
    	window.location = '#/level';
    }
  }();


	$scope.guess = function(char) {
    $scope.nat = "XNat";
    $scope.count++;
		$log.log("GUESSNG ", char, "in level", $scope.level, $scope.word, $scope.count);
	}

	$scope.chooseLevel = function(level) {
		$scope.level = level;
		window.location = '#/game/'+level;
	}
}