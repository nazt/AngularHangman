'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('hangman.services', []).
  value('version', '0.1').factory('hangmanBrain', function() {
    return new function() {
        var self = this,
            mappedVal = function(w, char) {  return (_.map(w, function(v, k) { if (v.toLowerCase() == char.toLowerCase()) { return k } })) },
            stripUndefinded  = function(l) { return  _.reject(l, function(v) { return v === undefined; }) },
            findIdx = _.compose(stripUndefinded, mappedVal);
            
        this.guess = findIdx;

        this.preparedAnswerObj = function(w) {
          var g = {};
          _.each(w, function(v, k) { g[v] = findIdx(w, v)});
          return g;
        }
    }
});;