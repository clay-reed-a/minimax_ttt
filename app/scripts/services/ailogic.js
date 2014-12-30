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

      var board = rowStringArr.join('\n-----\n');
      console.log(board);

    };

    
    ailogic.max = function(arr) {
      var max_el = Math.max.apply(null, arr);
      return arr.indexOf(max_el);
    };

    ailogic.min = function(arr) {
      var min_el = Math.min.apply(null, arr);
      return arr.indexOf(min_el);
    };

    ailogic.decideMove = function(board) {
      var me = this.me;
      var r = this.minimax(board, me, 6);
      return r[1]; 
    };

    ailogic.minimax = function(board, turnPlayer, depth) {

      var wonGame = this.won(board); 
      var availableMoves = this.getAvailableMoves(board); 
      var noMoves = availableMoves.length === 0; 
      
      var endGameConditions = wonGame || noMoves; 
      var playerFlip = this.flipPlayer(turnPlayer);
      var scores = [];
      var moves = [];

      if (endGameConditions || !depth) {
        return [this.score(wonGame)]; 
      }

      for (var a = 0; a < availableMoves.length; a++) {
        var move = availableMoves[a]; 
        var imaginaryBoard = angular.copy(board); 
        imaginaryBoard[move.row][move.column].space = turnPlayer;
        this.printBoard(imaginaryBoard);
        var evaluation = this.minimax(imaginaryBoard, playerFlip, depth-1);
        scores.push(evaluation[0]);
        moves.push(move);
      }

      if (turnPlayer === this.me) {

        var max_idx = this.max(scores);
        var max = scores[max_idx]; 
        var choice = moves[max_idx]; 
        return [max, choice]; 
      } else {
 
        var min_idx = this.min(scores);
        var min = scores[min_idx];
        var choice = moves[min_idx];
        return [min, choice];
      }
    };

    ailogic.flipPlayer = function(player) {
      if (player === 'x')
        return 'o'; 
      if (player === 'o')
        return 'x'; 
    };

    ailogic.score = function(wonGame, currentPlayer) {
      if (wonGame) {
        if (wonGame == currentPlayer) {
          return 10; 
        } else {
          return -10; 
        }
      } else {
        return 0;  
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
