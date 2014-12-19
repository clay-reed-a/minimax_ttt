'use strict';

/**
 * @ngdoc service
 * @name tictactoeApp.aILogic
 * @description
 * # aILogic
 * Service in the tictactoeApp.
 */
angular.module('tictactoeApp')
  .factory('AiLogic', function () {
    var ailogic = {};

    ailogic.decideMove = function(board) {
      return this.iHaveTwoInARow(board);
    };

    ailogic.twoInRow = function(cells, player) {
      var occupied = this.count(cells, player), 
             empty = this.count(cells, '');
      var twoOccupied = occupied === 2,
             oneEmpty = empty === 1;

      return (twoOccupied && oneEmpty);
    };

    ailogic.count = function(arr, countElement) {
      var countElements = arr.filter(function(arrElement) {
        return arrElement === countElement;
      });
      return countElements.length; 
    }

    ailogic.iHaveTwoInARow = function(board) {
      var wins = this.allWins(),
            me = 'x';
      for (var i = 0; i < wins.length; i++) {
        var win = wins[i];

        var cells = win.map(function(cell) {
          return board[cell.row][cell.column].space;
        });

        if (this.twoInRow(cells, me)) {
          var index = cells.indexOf(''),
               move = [win[index].row, win[index].column];
          console.log("I have two in a row. I should move: ")
          console.log(move);
          return move;
        };
      }
      return false; 
    };

    ailogic.allWins = function() {
      return [
        // horizontal wins  
        [{row: 0, column: 0},{row: 0, column: 1},{row: 0, column: 2}],
        [{row: 1, column: 0},{row: 1, column: 1},{row: 1, column: 2}],
        [{row: 2, column: 0},{row: 2, column: 1},{row: 2, column: 2}],
        // vertical wins 
        [{row: 0, column: 0},{row: 1, column: 0},{row: 2, column: 0}],
        [{row: 0, column: 1},{row: 1, column: 1},{row: 2, column: 1}],
        [{row: 0, column: 2},{row: 1, column: 2},{row: 2, column: 2}],
        // diagonal wins 
        [{row: 0, column: 0},{row: 1, column: 1},{row: 2, column: 2}],
        [{row: 0, column: 2},{row: 1, column: 1},{row: 2, column: 0}]  
      ];
    };

    return ailogic; 
  });
