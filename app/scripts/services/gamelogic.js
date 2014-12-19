'use strict';

/**
 * @ngdoc service
 * @name tictactoeApp.gamelogic
 * @description
 * # gamelogic
 * Service in the tictactoeApp.
 */
angular.module('tictactoeApp')
  .factory('GameLogic', function () {

    var gamelogic = {};

    gamelogic.newBoard = function() {
      return [
      [
        {position: {row: 0, column: 0}, space: ''}, 
        {position: {row: 0, column: 1}, space: ''}, 
        {position: {row: 0, column: 2}, space: ''}
      ],
      [
        {position: {row: 1, column: 0}, space: ''}, 
        {position: {row: 1, column: 1}, space: ''}, 
        {position: {row: 1, column: 2}, space: ''}
      ],
      [
        {position: {row: 2, column: 0}, space: ''}, 
        {position: {row: 2, column: 1}, space: ''}, 
        {position: {row: 2, column: 2}, space: ''}
      ]];
    };

    gamelogic.allWins = function() {
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

    gamelogic.won = function(board) {
      var wins = this.allWins();
      for(var i = 0; i < wins.length; i++) {  
        var win = wins[i];

        var cells = win.map(function(cell) {
          return board[cell.row][cell.column].space;
        });
       
        if (this.threeInRow(cells)) {
          return cells[0];
        }
      }

      return false; 
    };

    gamelogic.threeInRow = function(cells) {
      var firstCell = cells[0], 
         secondCell = cells[1], 
          thirdCell = cells[2];
      return (
        (firstCell === secondCell) && 
        (secondCell === thirdCell) &&
        (firstCell !== '')
      );
    };

    return gamelogic; 
    
  });
