'use strict';

/* Controllers */

function GameController($scope, $log, $routeParams, hangmanBrain) {
    var maxWrong = 10;
    var dictionaries = {1: ['ant', 'rat', 'bat', 'hat', 'sat'], 2: ['worship', 'warlord', 'daddy'], 3: ['opendream', 'agility', 'preparing'] }
    $scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    $scope.question = _.shuffle(dictionaries[$routeParams.level])[0]
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
        if ($scope.gameStatus !== '') { return; }
        $scope.guessed.push(char);
        idxes = hangmanBrain.guess($scope.question.split(''), char);
        if (_.isEmpty(idxes)) {
            $scope.wrong++;
            if ($scope.wrong >= maxWrong) {
                $scope.message = "You LOSE!";
                $scope.gameStatus = "lose";
                $scope.word = $scope.question;
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


}

function LevelController($scope, $window) {
    $scope.allowLevel = [1, 2, 3];
    $scope.chooseLevel = function(level) {
        var gameLevel;
        if (_.contains($scope.allowLevel, level)) {
            gameLevel = '#/game/' + level;  
        }
        else {
            gameLevel = '#/level';  
        }
        
        $window.location = gameLevel;
    }
}