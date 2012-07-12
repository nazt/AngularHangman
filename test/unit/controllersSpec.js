'use strict';

/* jasmine specs for controllers go here */

describe('Hangman Controllers', function () {
    describe('LevelController', function() {
        var scope,
                window;
        beforeEach(inject(function($controller, $rootScope, $window) {
            // store reference to scope, so that we can access it from the specs
            scope = $rootScope.$new();
            window = { };

            // instantiate the controller
            $controller('LevelController', {$scope: scope, $window: window});
        }));

        describe('allowLevel', function () {
            it('should equal to [1,2,3]',function () {
                expect(scope.allowLevel).toEqual([1, 2, 3]);
            });
        });

        describe('choose valid level', function () {
            it('should equal', function () {
                angular.forEach([1, 2, 3], function(l){
                    scope.chooseLevel(l);
                    expect(window.location).toBe('#/game/'+l);
                });
            });
        })

        describe('choose invalid level', function () {
            it('should equal', function () {
                angular.forEach([4, 5, 6, 'a', undefined, ''], function(l){
                    scope.chooseLevel(l);
                    expect(window.location).toBe('#/level');
                });
            });
        })
    });


    describe('GameController', function () {
        var scope,
                window,
                routeParams;

        beforeEach(inject(function($controller, $rootScope, $window) {
            // store reference to scope, so that we can access it from the specs
            scope = $rootScope.$new();
            //scope.question = 'daddy';
            //scope.dictionaryProvider = { getWord: function(l) { return 'daddy'; } };
            window = { };
            routeParams = { level: 2 }
            // instantiate the controller
            $controller('GameController', { $scope: scope, 
                $window: window, $routeParams: routeParams});
        }));

        describe("Initialize value", function () {
            it("should Initialize value of abc", function () {
                var ABC = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                 'W', 'X', 'Y', 'Z' ];
                expect(scope.abc).toEqual(ABC);
            });

            it("should Initialize all tries", function () {
                expect(scope.wrong).toBe(0);
                expect(scope.correct).toBe(0);
                expect(scope.gameStatus).toBe('');
                expect(scope.level).toBe(2);


                //scope.guess('d');
                //expect(scope.revealedWord).toEqual(['d','_', 'd', 'd', 'y']);
                //expect(scope.wrong).toBe(0);
                //expect(scope.correct).toBe(0);
            });
        });

        describe("Find All Idx", function () {
            it("should return position correctly", function () {
                scope.dictionaryProvider = { getWord: function(l){ return 'daddy'; } }
                scope.setWord();
                expect(scope.question).toBe('daddy');
                expect(scope.word).toEqual("_____")
                expect(scope.revealedWord).toEqual(['_', '_', '_', '_', '_']);

                expect(scope.findAllIdx('d')).toEqual([0, 2, 3])
                expect(scope.findAllIdx('a')).toEqual([1])
                expect(scope.findAllIdx('y')).toEqual([4])
            })  
        });

        describe("Guess a word and win game", function () {
            it("should guess reveal correctly", function () {
                scope.dictionaryProvider = { getWord: function(l){ return 'daddy'; } }
                scope.setWord(); 

                scope.guess('d');
                expect(scope.word).toEqual("d_dd_")
                expect(scope.revealedWord).toEqual(['d', '_', 'd', 'd', '_']);
                expect(scope.correct).toBe(1);

                scope.guess('d');
                expect(scope.word).toEqual("d_dd_")
                expect(scope.revealedWord).toEqual(['d', '_', 'd', 'd', '_']);
                expect(scope.correct).toBe(1);
                expect(scope.gameStatus).toBe('');

                scope.guess('a');
                expect(scope.word).toEqual("dadd_")
                expect(scope.revealedWord).toEqual(['d', 'a', 'd', 'd', '_']);
                expect(scope.correct).toBe(2);
                expect(scope.gameStatus).toBe('');

                scope.guess('y');
                expect(scope.word).toEqual("daddy")
                expect(scope.revealedWord).toEqual(['d', 'a', 'd', 'd', 'y']);
                expect(scope.correct).toBe(3);
                expect(scope.gameStatus).toBe('win');
                expect(scope.message).toBe('You WIN!');
           });
        });

        describe("Guess a word and lose game", function () {
            it("should lose the game", function () {
                scope.dictionaryProvider = { getWord: function(l){ return 'daddy'; } }
                scope.setWord(); 
                scope.maxWrong = 5;

                scope.guess('d');
                expect(scope.word).toEqual("d_dd_")
                expect(scope.revealedWord).toEqual(['d', '_', 'd', 'd', '_']);
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(0);

                scope.guess('p');
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(1);
                expect(scope.gameStatus).toBe('');

                scope.guess('q');
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(2);
                expect(scope.gameStatus).toBe('');

                scope.guess('r');
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(3);
                expect(scope.gameStatus).toBe('');

                scope.guess('s');
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(4);
                expect(scope.gameStatus).toBe('');

                scope.guess('t');
                expect(scope.correct).toBe(1);
                expect(scope.wrong).toBe(5);
                expect(scope.gameStatus).toBe('lose');
                expect(scope.message).toBe('You LOSE!');
                expect(scope.word).toEqual('daddy');
           });
        });

    })

})