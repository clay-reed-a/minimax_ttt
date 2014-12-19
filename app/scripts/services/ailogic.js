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
      var iCanWinHere = this.hasTwoInARow(board, 'o'),
       theyCanWinHere = this.hasTwoInARow(board, 'x');
      if (iCanWinHere) {
        return iCanWinHere;
      } if (theyCanWinHere) {
        return theyCanWinHere; 
      } else {
        return this.chooseLegalMove(board); 
      }
    };

    ailogic.chooseLegalMove = function(board) {
      var moves = this.legalMoves(), 
          space_available = false, 
          move,
          space;
      for (var m = 0; m < moves.length; m++) {
        move = moves[m];
        space = board[move.row][move.column].space;
        space_available = space === ''; 
        if (space_available) {
          return [move.row, move.column];
        }
      }
    };

    ailogic.legalMoves = function() {
      // legal moves are ordered  
      // from most to least desirable: 
      // 5 > 1 >= 3 >= 9 >= 7 > 2 >= 6 >= 8 >= 4  
      return [
        // center 
        {row: 1, column: 1}, // 5 in Knuth 
        // corners 
        {row: 0, column: 0}, // 1 in Knuth 
        {row: 0, column: 2}, // 3 in Knuth 
        {row: 2, column: 2}, // 9 in Knuth 
        {row: 2, column: 0}, // 7 in Knuth 
        // sides 
        {row: 0, column: 1}, // 2 in Knuth 
        {row: 1, column: 2}, // 6 in Knuth 
        {row: 2, column: 1}, // 8 in Knuth 
        {row: 1, column: 0} // 4 in Knuth  
      ];
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

    ailogic.hasTwoInARow = function(board, player) {
      var wins = this.allWins();
      for (var i = 0; i < wins.length; i++) {
        var win = wins[i];

        var cells = win.map(function(cell) {
          return board[cell.row][cell.column].space;
        });

        if (this.twoInRow(cells, player)) {
          var index = cells.indexOf(''),
               move = [win[index].row, win[index].column];
    
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
