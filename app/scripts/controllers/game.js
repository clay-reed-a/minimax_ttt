'use strict';

/**
 * @ngdoc function
 * @name tictactoeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the tictactoeApp
 */
angular.module('tictactoeApp')
  .controller('GameCtrl', function ($scope, GameLogic) {
    $scope.board = null;

    $scope.newGame = function() {
      $scope.board = GameLogic.newBoard(); 
    };

    $scope.userMove = function(where) {
      var rowIndex = where.row;
      var colIndex = where.column;
      $scope.board[rowIndex][colIndex].space = 'X';
      GameLogic.won($scope.board);
    };
  });
