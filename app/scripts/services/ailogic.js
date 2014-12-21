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

    ailogic.randomElement = function(arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    ailogic.decideMove = function(board) {
      var me = this.me,
          them = this.them;
      var iCanWinHere = this.hasTwoInARow(board, me),
       theyCanWinHere = this.hasTwoInARow(board, them), 
       iCanForkHere = this.spotFork(board, me),
       theyCanForkHere = this.spotFork(board, them);
      if (iCanWinHere) {
        console.log('I win again!');

        return iCanWinHere[0];
      } else if (theyCanWinHere) {
        console.log('They can\'t win!');

        return theyCanWinHere[0]; 
      } else if (iCanForkHere) { 
        console.log('I will win!');

        return this.randomElement(iCanForkHere);
      } else if (theyCanForkHere) {
        console.log('They might fork!');

        if (theyCanForkHere.length === 2) {
          console.log('I will get them!');
          var attacks = this.findAgress(board);

          return this.randomElement(attacks);
        } else {
          console.log('I will stop them!');

          return theyCanForkHere[0];
        }
      } else {
        console.log('I\'m gonna go here!');
        var bestMoves = this.chooseLegalMove(board); 

        return this.randomElement(bestMoves);
      }
    };

    ailogic.chooseLegalMove = function(board) {
      var moveTypes = this.legalMoves(), 
          movesAvailable,  
          moveType;
      for (var t = 0; t < moveTypes.length; t++) {
        moveType = moveTypes[t];
        movesAvailable = this.getAvailableMoves(moveType, board);
    
        if (movesAvailable.length !== 0) {
          return movesAvailable;
        }
      }
    };

    ailogic.getAvailableMoves = function(moveSet, board) {
      return moveSet.filter(function(move) {
        return board[move[0]][move[1]].space === '';  
      });
    };

    ailogic.legalMoves = function() {
      // legal moves are ordered  
      // from most to least desirable: 
      // 5 > 1 >= 3 >= 9 >= 7 > 2 >= 6 >= 8 >= 4  
      return [
        // center 
        [[1, 1]], // 5 in Knuth 
        // corners 
        [[0, 0], // 1 in Knuth 
         [0, 2], // 3 in Knuth 
         [2, 2], // 9 in Knuth 
         [2, 0]], // 7 in Knuth 
        // sides 
        [[0, 1], // 2 in Knuth 
         [1, 2], // 6 in Knuth 
         [2, 1], // 8 in Knuth 
         [1, 0]] // 4 in Knuth  
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
    };

    ailogic.considerEmptySpaces = function(board) {
      var emptySpaces = [], 
          row, 
          cell;
      for (var r = 0; r < board.length; r++) {
        row = board[r];
        for(var c = 0; c < row.length; c++) {
          cell = row[c];
          if (cell.space === '') {
            emptySpaces.push(cell.position);
          }
        }
      }
      return emptySpaces;
    };

    ailogic.findAgress = function(board) {
      var emptySpaces = this.considerEmptySpaces(board);
      var attacks = [];

      for (var e = 0; e < emptySpaces.length; e++) {
        var emptySpace = emptySpaces[e];
        var imaginaryBoard = angular.copy(board);
        imaginaryBoard[emptySpace.row][emptySpace.column].space = this.me;
        var theyBlock = this.hasTwoInARow(imaginaryBoard, this.me); 
    
        if (theyBlock) {
         
          for (var b = 0; b < theyBlock.length; b++) {
            var block = theyBlock[b];
    
            imaginaryBoard[block[0]][block[1]].space = this.them;
            var forcedIntoFork = this.haveFork(imaginaryBoard, this.them);
            var notForcedIntoFork = !forcedIntoFork;
            if (notForcedIntoFork) {
              attacks.push([emptySpace.row, emptySpace.column]);
            } 
          }

        }
      }

      return attacks; 
    };

    ailogic.hasTwoInARow = function(board, player) {
      var wins = this.allWins(),
      movesToWin = [];
      for (var i = 0; i < wins.length; i++) {
        var win = wins[i];

        var cells = this.getCells(win, board);

        if (this.twoInRow(cells, player)) {
          var index = cells.indexOf(''),
               move = [win[index].row, win[index].column];

          movesToWin.push(move);
        }
      }
      if (movesToWin.length === 0) {
        return false;  
      } else {
        return movesToWin;
      }
    };

    ailogic.getCells = function(row, board) {
      return row.map(function(cell) {
        return board[cell.row][cell.column].space; 
      });
    };

    ailogic.spotFork = function(board, player) {
      var emptySpaces = this.considerEmptySpaces(board),
          emptySpace, 
          imaginaryBoard, 
                emptyRow,
                emptyCol, 
                    wins, 
                   forks = [];
      for (var e = 0; e < emptySpaces.length; e++) {
        emptySpace = emptySpaces[e]; 
        imaginaryBoard = angular.copy(board);

        emptyRow = emptySpace.row; 
        emptyCol = emptySpace.column;

        imaginaryBoard[emptyRow][emptyCol].space = player;
        wins = this.hasTwoInARow(imaginaryBoard, player);
        if (wins.length === 2) {
          forks.push([emptyRow, emptyCol]); 
        }
      }
      if (forks.length !== 0) {

        return forks;
      } else {
        return false; 
      }
    };

    ailogic.haveFork = function(board, player) {
      var sets = this.hasTwoInARow(board, player);
      return sets.length === 2; 
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
