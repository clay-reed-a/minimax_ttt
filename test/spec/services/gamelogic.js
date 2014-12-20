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
  

    it('should return false when the game is not over', function () { 
      var board = gamelogic.newBoard();
      expect(gamelogic.won(board)).toBe(false);
    });

    it('should return who won they win a horizontal', function() {
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

    it('should return who won when they win a vertical', function() {
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

    it('should return who won when they win a rightward diagonal', function(){
      var player = 'o',
          board = gamelogic.newBoard();
      board[0][0].space = player;
      board[1][1].space = player;
      board[2][2].space = player; 
      expect(gamelogic.won(board)).toBe(player);
    });

     it('should return  who won when they win a leftward diagonal', function(){
      var player = 'x',
          board = gamelogic.newBoard();
      board[0][2].space = player;
      board[1][1].space = player;
      board[2][0].space = player; 
      expect(gamelogic.won(board)).toBe(player);
    });
  });

  describe('draws', function() {
    var board; 
    beforeEach(function() {

      board = gamelogic.newBoard();

      // a plausible draw 
      board[0][1].space = 'o';
      board[0][0].space = 'o';
      board[0][2].space = 'x';
      board[1][0].space = 'x';
      board[1][1].space = 'x';
      board[1][2].space = 'o';
      board[2][0].space = 'o';
      board[2][1].space = 'x';
      board[2][2].space = 'x';
  
    });

    it('#won should return false when it\'s a draw', function() {
      expect(gamelogic.won(board)).toBe(false);
    });
    
    it('#draw should return true when it\'s a draw', function() {
      expect(gamelogic.draw(board)).toBe(true);
    });
  });
});
