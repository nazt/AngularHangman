'use strict';

/* Controllers */

function HangmanController($scope, $log, $routeParams, hangmanBrain) {
    $scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    $scope.question = "Hello"
    $scope.level = $scope.question.length || $routeParams.level || 0;
    $scope.wrong = 0;
    var maxWrong = 8;
    $scope.guessed = [];
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

    $scope.guess = function(char) {
        var char = char.toLowerCase();
        if (_.indexOf($scope.guessed, char) !== -1) {
            return; 
        }
        $scope.guessed.push(char);
        var idxes = hangmanBrain.guess($scope.question.split(''), char);
        if (_.isEmpty(idxes)) {
            if ($scope.wrong >= maxWrong) {
                $scope.message = "You LOSE!";
                return;
            }
            $scope.wrong++;
        }
        else {

            $scope.correct++;
            _.each(idxes, function(v, k){ 
                $scope.revealedWord[v] = $scope.question[v];
            });
            var pp = hangmanBrain.preparedAnswerObj($scope.question.split(''));
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