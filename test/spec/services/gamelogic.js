'use strict';

describe('Service: Gamelogic', function () {

  // load the service's module
  beforeEach(module('tictactoeApp'));

  // instantiate service
  var gamelogic;
  beforeEach(inject(function (_GameLogic_) {
    gamelogic = _GameLogic_;
  }));

  describe('#won', function() {
  

    it('should not return false when the board is untouched', function () { 
      var board = gamelogic.newBoard();
      expect(gamelogic.won(board)).toBe(false);
    });

    it('should return the player who won when there is a horizontal win', function() {
      var player = 'o', 
          board; 
      for(var row = 0; row < 3; row++) {
        board = gamelogic.newBoard();
        board[row][0].space = player;
        board[row][1].space = player;
        board[row][2].space = player;
        expect(gamelogic.won(board)).toBe(player);
      }
    });

    it('should return the player who won when there is a vertical win', function() {
      var player = 'x', 
          board;  
      for(var col = 0; col < 3; col++) {
        board = gamelogic.newBoard();
        board[0][col].space = player;
        board[1][col].space = player;
        board[2][col].space = player; 
        expect(gamelogic.won(board)).toBe(player);
      }
    });

    it('should return the player who won when there is a rightward diagonal win', function(){
      var player = 'o',
          board = gamelogic.newBoard();
      board[0][0].space = player;
      board[1][1].space = player;
      board[2][2].space = player; 
      expect(gamelogic.won(board)).toBe(player);
    });

     it('should return the player who won when there is a rightward diagonal win', function(){
      var player = 'x',
          board = gamelogic.newBoard();
      board[0][2].space = player;
      board[1][1].space = player;
      board[2][0].space = player; 
      expect(gamelogic.won(board)).toBe(player);
    });



  });
});
