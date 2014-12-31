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

    ailogic.them = 'x';
    ailogic.me = 'o'; 

    ailogic.printBoard = function(board) {
      var rowStringArr = [];
      var rowCells = this.getRowCells(board);
      for (var r = 0; r < rowCells.length; r++) {
        var row = rowCells[r].join('|');
        rowStringArr.push(row); 
      }

      var boardStr = rowStringArr.join('\n-----\n');
      console.log(boardStr);

    };

    ailogic.decideMove = function(board) {
      var bestMoveValue = -100;
      var move = null; 
      var availableMoves = this.getAvailableMoves(board);
 
      for (var a = 0; a < availableMoves.length; a++) {
        var availableMove = availableMoves[a];
        var imaginaryBoard = angular.copy(board);
        imaginaryBoard[availableMove.row][availableMove.column].space = this.me;
        var availableMoveValue = this.minValue(imaginaryBoard);
        if (availableMoveValue > bestMoveValue) {
          bestMoveValue = availableMoveValue;
          move = availableMove;
        }
      }
      return move; 
    };

    ailogic.minValue = function(board) {
      var availableMoves = this.getAvailableMoves(board);
      var winner = this.won(board); 
      if (winner === this.me) {
        return 1;
      } else if (winner === this.them) {
        return -1; 
      } else if (availableMoves.length === 0) {
        return 0; 
      } else {
        var bestMoveValue = 100; 
        for (var a = 0; a < availableMoves.length; a++) {
          var availableMove = availableMoves[a];
          var imaginaryBoard = angular.copy(board);
          imaginaryBoard[availableMove.row][availableMove.column].space = this.them;
          var availableMoveValue = this.maxValue(imaginaryBoard);
          if (availableMoveValue < bestMoveValue) {
            bestMoveValue = availableMoveValue;

          }
        }
        return bestMoveValue; 
      }
    };

    ailogic.maxValue = function(board) {
      var availableMoves = this.getAvailableMoves(board);
      var winner = this.won(board);
      if (winner === this.me) {
        return 1; 
      } else if (winner === this.them) {
        return -1;
      } else if (availableMoves.length === 0) {
        return 0; 
      } else {
        var bestMoveValue = -100; 
        for (var a = 0; a < availableMoves.length; a++) {
          var availableMove = availableMoves[a];
          var imaginaryBoard = angular.copy(board);
          imaginaryBoard[availableMove.row][availableMove.column].space = this.me;
          var availableMoveValue = this.minValue(imaginaryBoard);
          if (availableMoveValue > bestMoveValue) {
            bestMoveValue = availableMoveValue;
          }
        }
        return bestMoveValue; 
      }
    };
    

    ailogic.flipPlayer = function(player) {
      if (player === 'x') {
        return 'o'; 
      } else {
        return 'x'; 
      }
    };

    ailogic.getAvailableMoves = function(board) {
      var availableMoves = [];
      for (var r = 0; r < board.length; r++) {
        var row = board[r];
        for (var c = 0; c < row.length; c++) {
          var cell = row[c];
          var cellIsEmpty = cell.space === '';  
          if (cellIsEmpty) {
            availableMoves.push(cell.position);
          } 
        }
      }
      return availableMoves;
    };



    ailogic.won = function(board) {
      var wins = this.allWins();
      for(var i = 0; i < wins.length; i++) {  
        var win = wins[i];

        var cells = this.getWinCells(board, win);
       
        if (this.threeInRow(cells)) {
          return cells[0];
        }
      }

      return false; 
    };

    ailogic.getWinCells = function(board, win) {
      return win.map(function(cell) {
        return board[cell.row][cell.column].space; 
      });
    };

    ailogic.getRowCells = function(board) {
      var rowsCells = [];
      for (var r = 0; r < board.length; r++) {
        var row = board[r];
        var rowArr = [];
        for(var c = 0; c < board.length; c++) {
          var cell = row[c];
          if (cell.space) {
            rowArr.push(cell.space);
          } else {
            rowArr.push(' ');
          }
          
        }
        rowsCells.push(rowArr);
      }
      return rowsCells;
    };

    ailogic.threeInRow = function(cells) {
      var firstCell = cells[0], 
         secondCell = cells[1], 
          thirdCell = cells[2];
      return (
        (firstCell === secondCell) && 
        (secondCell === thirdCell) &&
        (firstCell !== '')
      );
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
