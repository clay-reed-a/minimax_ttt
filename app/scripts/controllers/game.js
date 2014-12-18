'use strict';

/**
 * @ngdoc function
 * @name tictactoeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the tictactoeApp
 */
angular.module('tictactoeApp')
  .controller('GameCtrl', function ($scope) {
    $scope.board = [
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

    $scope.userMove = function(where) {
      var rowIndex = where.row;
      var colIndex = where.column;
      $scope.board[rowIndex][colIndex].space = 'X';
    };
  });
