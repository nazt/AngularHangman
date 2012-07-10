'use strict';

/* Controllers */

function HangmanController($scope, $log, $routeParams, hangmanBrain) {
    var maxWrong = 10;
    $scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    $scope.question = "Hello".toUpperCase();
    $scope.level = $scope.question.length || $routeParams.level || 0;
    $scope.wrong = 0;
    $scope.guessed = [];
    $scope.correct = 0;
    $scope.gameStatus = '';

    // Construct
    !function() {
        $scope.word = new Array($scope.level+1).join('_');
        $scope.revealedWord = $scope.word.split('');
        if ($scope.level < 1 ) {
            window.location = '#/level';
        }
    }();


    $scope.guess = function(char) {
        var idxes;
        if (_.indexOf($scope.guessed, char) !== -1 || $scope.gameStatus) {
            $log.log ("RETURN");
            return; 
        }
        $scope.guessed.push(char);
        idxes = hangmanBrain.guess($scope.question.split(''), char);
        if (_.isEmpty(idxes)) {
            $scope.wrong++;
            if ($scope.wrong >= maxWrong) {
                $scope.message = "You LOSE!";
                $scope.gameStatus = "lose";
                return;
            }
        }
        else {
            $scope.correct++;
            _.each(idxes, function(v, k){ 
                $scope.revealedWord[v] = $scope.question[v];
            });
            var pp = hangmanBrain.preparedAnswerObj($scope.question.split(''));
            if (_.size(pp) == $scope.correct) {
                $scope.message = "You WIN!";
                $scope.gameStatus = "win";
            }
            $scope.word = $scope.revealedWord.join('');
        }
    }

    $scope.chooseLevel = function(level) {
        $scope.level = level;
        window.location = '#/game/'+level;
    }

}