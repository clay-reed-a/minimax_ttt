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
      ] 
          ];
    };

    return gamelogic; 
    
  });
