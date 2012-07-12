'use strict';

/* Controllers */

function GameController($scope, $log, $routeParams) {
    $scope.maxWrong = 10;
    $scope.dictionaryProvider = (function() { 
        var dicts = {
            1: ['ant', 'rat', 'bat', 'hat', 'sat'], 
            2: ['warship', 'warlord', 'daddy'],
            3: ['opendream', 'agility', 'preparing']
        }
        var ret = {};
        ret.getWord = function(level) {
            return (_.shuffle(dicts[level])[0]).toUpperCase();
        }
        return ret;
    })();

    $scope.abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    $scope.used = {};
    $scope.wrong = 0;
    $scope.correct = 0;
    $scope.gameStatus = '';
    $scope.level = $routeParams.level;
    $scope.guessed = [];


    // INIT 

    $scope.setWord = function() {
        $scope.question = $scope.dictionaryProvider.getWord($routeParams.level);
        $scope.word = new Array($scope.question.length+1).join('_');
        $scope.revealedWord = $scope.word.split('');
    }
    
    $scope.setWord();
    
    $scope.findAllIdx = function(search) {
        var charList = $scope.question.split('');
        var result = [];

        _.filter(charList, function(val, key) { 
            if (val == search) {
                result.push(key)
                return true
            }
            else {
                return false;
            }
        }); 
        return result;
    }


    $scope.guess = function(c) {
        console.log('guess', c, 'of', $scope.question)
        var idxes;

        // RETURN IF CHAR USED
        if (_.has($scope.used, c)) { 
            return; 
        }

        // GUESSING
        idxes = $scope.findAllIdx(c);
        $scope.used[c] = true;


        // CORRECT OR WRONG
        if (_.isEmpty(idxes)) {
            $scope.wrong += 1;
        }
        else {
            _.each(idxes, function(idx){
                $scope.revealedWord[idx] = $scope.question[idx];
            });
            $scope.correct += 1;
        }

        // REVEAL THE WORD
        $scope.word = $scope.revealedWord.join('')


        // WIN OR LOSE
        if ($scope.wrong == $scope.maxWrong) {
            $scope.gameStatus = 'lose'
            $scope.message = 'You LOSE!'
            $scope.word = $scope.question;
        }
        else if ($scope.word == $scope.question) {
            $scope.gameStatus = 'win';
            $scope.message = 'You WIN!';
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