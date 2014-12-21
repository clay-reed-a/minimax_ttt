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

    $scope.opponent = 'AI';
    $scope.goesFirst = 'Me';
    $scope.opponentMark = 'x';
    $scope.playerMark = 'o';

    $scope.newGame = function() {
      $scope.board = GameLogic.newBoard();

      
      $scope.playerMark = ($scope.opponentMark === 'x') ? 'o' : 'x';

      if (($scope.goesFirst === 'Them')
        && 
          ($scope.opponent === 'human')) {
        var cache = $scope.playerMark;
        $scope.playerMark = $scope.opponentMark,
        $scope.opponentMark = cache; 
      }

      if ($scope.opponent === 'AI') {
        AiLogic.me = $scope.opponentMark;
        AiLogic.them = $scope.playerMark;  
      }
      if (($scope.goesFirst === 'Them') 
        && 
          ($scope.opponent === 'AI')) {
        var openingMove = AiLogic.decideMove($scope.board);
        $scope.aiMove(openingMove);
      }
    };

    $scope.aiMove = function(where) {

      var row = where[0],
          col = where[1];

       $scope.board[row][col].space = $scope.opponentMark; 
    };

    $scope.userMove = function(where) {
      var rowIndex = where.row, 
          colIndex = where.column;
      
      $scope.board[rowIndex][colIndex].space = $scope.playerMark;
      if (GameLogic.won($scope.board)) {
        console.log($scope.playerMark+' wins!');
        $scope.board = null;
      } else {
        if (GameLogic.draw($scope.board)) {
          console.log('nobody wins!');
          $scope.board = null;
        } else {
          if ($scope.opponent === 'AI') {
            var response = AiLogic.decideMove($scope.board);
            $scope.aiMove(response);
            if (GameLogic.won($scope.board)) {
              console.log(AiLogic.me+' wins!');
              $scope.board = null;
            } else {
              if (GameLogic.draw($scope.board)) {
                console.log('nobody wins!');
                $scope.board = null;
              }
            }
          } else {

            var cache = $scope.playerMark;
            $scope.playerMark = $scope.opponentMark,
            $scope.opponentMark = cache; 

    
          }
        }
      }      
    };
  });
