'use strict';

/* Controllers */

function HangmanController($scope, $log, $routeParams) {
	$scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  $scope.question = "Hello"
  $scope.level = $scope.question.length || $routeParams.level || 0;
  $scope.wrong = 0;
  $scope.correct = 0;

  // Construct
  !function() {
    $scope.word = new Array($scope.level+1).join('_');
    $scope.revealedWord = $scope.word.split('')
    $log.log("revealedWord", $scope.revealedWord);
    if ($scope.level < 1 ) {
    	window.location = '#/level';
    }
  }();


  var mappedVal = function(w, char) {  return (_.map(w, function(v, k) { if (v.toLowerCase() == char.toLowerCase()) { return k } })) };
  var stripUndefinded  = function(l) { return  _.reject(l, function(v) { return v === undefined; }) }
  var findIdx = _.compose(stripUndefinded, mappedVal);
  var preparedAnswerObj = function(w) {
      var g = {};
      _.each(w, function(v, k) { g[v] = findIdx(w, v)});
      return g;
  }

  $scope.guess = function(char) {
    $log.log("GUESSNG ", char, "in level", $scope.level, $scope.word, $scope.wrong);
    var idxes = findIdx($scope.question.split(''), char);
    if (_.isEmpty(idxes)) {
      $scope.wrong++;
      if ($scope.wrong >= 8) {
        $scope.message = "You LOSE!";
      }
    }
    else {
      $scope.correct++;
      _.each(idxes, function(v, k){ 
        $scope.revealedWord[v] = $scope.question[v];
      });
      var pp = preparedAnswerObj($scope.question.split(''));
      if (_.size(pp) == $scope.correct) {
        $scope.message = "You WIN!";
      }
      $scope.word = $scope.revealedWord.join('');
    }
  }

  $scope.chooseLevel = function(level) {
    $scope.level = level;
    window.location = '#/game/'+level;
  }

}