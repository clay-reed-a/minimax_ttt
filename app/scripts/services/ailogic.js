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

    ailogic.me = 'o'; 

    ailogic.randomElement = function(arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      console.log(randomIndex);
      return arr[randomIndex];
    };

    ailogic.decideMove = function(board) {
      var me = this.me;
      var iCanWinHere = this.hasTwoInARow(board, me),
       theyCanWinHere = this.hasTwoInARow(board, 'x'), 
       iCanForkHere = this.spotFork(board, me),
       theyCanForkHere = this.spotFork(board, 'x');
      if (iCanWinHere) {
        console.log("I have won!");
        console.log(JSON.stringify(iCanWinHere));
        return iCanWinHere[0];
      } else if (theyCanWinHere) {
        console.log("They are winning!");
        console.log(JSON.stringify(theyCanWinHere));
        return theyCanWinHere[0]; 
      } else if (iCanForkHere) { 
        console.log("I will win!");
        console.log(JSON.stringify(iCanForkHere));
        return iCanForkHere[0];
      } else if (theyCanForkHere) {
        console.log("They might fork!");

        if (theyCanForkHere.length === 2) {
          console.log("I will get them!");
          var attacks = this.findAgress(board);
          console.log(JSON.stringify(attacks));
          return this.randomElement(attacks);
        } else {
          console.log("I will block them!");
          console.log(JSON.stringify(theyCanForkHere));
          return theyCanForkHere[0];
        }
      } else {
        console.log("I should move here!");
        var best_moves = this.chooseLegalMove(board); 
        console.log(JSON.stringify(best_moves));
        return this.randomElement(best_moves);
      }
    };

    ailogic.chooseLegalMove = function(board) {
      var move_types = this.legalMoves(), 
          space_available = false,
          moves_available,
          move,  
          move_type,
          space;
      for (var t = 0; t < move_types.length; t++) {
        move_type = move_types[t];
        moves_available = move_type.filter(function(move) {
          space = board[move[0]][move[1]].space;
          space_available = space === '';
          return space_available;
        });
    
        if (moves_available.length !== 0) {
          return moves_available;
        }
      }
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
    
            imaginaryBoard[block[0]][block[1]].space = 'x';
            var forcedIntoFork = this.haveFork(imaginaryBoard, 'x');
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

        var cells = win.map(function(cell) {
          return board[cell.row][cell.column].space;
        });

        if (this.twoInRow(cells, player)) {
          var index = cells.indexOf(''),
               move = [win[index].row, win[index].column];

          movesToWin.push(move);
        };
      }
      if (movesToWin.length === 0) {
        return false;  
      } else {
        return movesToWin;
      }
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
        emptySpace = emptySpaces[e], 
        imaginaryBoard = angular.copy(board);

        emptyRow = emptySpace.row, 
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
