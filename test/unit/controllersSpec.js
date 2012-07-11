'use strict';

/* jasmine specs for controllers go here */

describe('Hangman', function () {
  var scope,
      window;
      
  describe('LevelController', function(){
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

})