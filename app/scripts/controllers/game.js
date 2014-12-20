'use strict';

/**
 * @ngdoc function
 * @name tictactoeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the tictactoeApp
 */
angular.module('tictactoeApp')
  .controller('GameCtrl', function ($scope, GameLogic, AiLogic) {
    $scope.board = null;

    $scope.newGame = function() {
      $scope.board = GameLogic.newBoard(); 
    };

    $scope.aiMove = function(where) {
      var row = where[0],
          col = where[1];

       $scope.board[row][col].space = 'o'; 
    };

    $scope.userMove = function(where) {
      var rowIndex = where.row, 
          colIndex = where.column;
      
      $scope.board[rowIndex][colIndex].space = 'x';
      if (GameLogic.won($scope.board)) {
        console.log('x wins!');
        $scope.board = null;
      } else {
        if (GameLogic.draw($scope.board)) {
          console.log('nobody wins!');
          $scope.board = null;
        } else {
          var response = AiLogic.decideMove($scope.board);
          $scope.aiMove(response);
          if (GameLogic.won($scope.board)) {
            console.log('o wins!');
            $scope.board = null;
          } else {
            if (GameLogic.draw($scope.board)) {
              console.log('nobody wins!');
              $scope.board = null;
            }
          }
        }
      }      
    };
  });
