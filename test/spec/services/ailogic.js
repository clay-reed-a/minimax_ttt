'use strict';

describe('Service: AiLogic', function () {

  // load the service's module
  beforeEach(module('tictactoeApp'));

  // instantiate service
  var AiLogic, 
      GameLogic;
  beforeEach(inject(function (_AiLogic_, _GameLogic_) {
    AiLogic = _AiLogic_, 
    GameLogic = _GameLogic_;
  }));

  describe('#legalMoves', function() {
    it('should return an list of 9 possible legal moves\n'+
      'ordered according to desirablity', function() {
        expect(AiLogic.legalMoves().length).toBe(9); 
      });
  });

  describe('#decideMove', function() {
    var board,
        move,
        moveRow,
        moveCol;
    beforeEach(function() {
      board = GameLogic.newBoard();
    });

    it('should choose center if board is empty', function() {
        // center is the most desirable 
        move = AiLogic.decideMove(board);
        moveRow = move[0], 
        moveCol = move[1];
        expect(moveRow).toBe(1);
        expect(moveCol).toBe(1);
    }); 

    it('should choose a corner if center is not available', function() {
      board[1][1].space = 'x';
      move = AiLogic.decideMove(board);
      moveRow = move[0],
      moveCol = move[1];
      // implementation has upper left first 
      expect(moveRow).toBe(0);
      expect(moveCol).toBe(0);
    });

    it('should choose a side if corners are not available', function() {
      // implementation has top side first 
      /* game situation   
       where this is possible w/o AI choosing to win */ 
      board[0][0].space = 'o';
      board[0][2].space = 'x';
      board[1][0].space = 'x';
      board[1][1].space = 'x';
      board[1][2].space = 'o';
      board[2][0].space = 'o';
      board[2][2].space = 'x';
      move = AiLogic.decideMove(board);
      moveRow = move[0],
      moveCol = move[1];
      expect(moveRow).toBe(0);
      expect(moveCol).toBe(1);

    });

    it('should recognize when it can win', function() {
      
      board[0][0].space = 'o';
      board[1][0].space = 'o';

      move = AiLogic.decideMove(board);
      moveRow = move[0], 
      moveCol = move[1];

      expect(moveRow).toBe(2);
      expect(moveCol).toBe(0);
    });

    it('should block other player\'s wins', function() {
      board[0][0].space = 'o';
      board[1][1].space = 'o';

      move = AiLogic.decideMove(board);
      moveRow = move[0],
      moveCol = move[1];

      expect(moveRow).toBe(2);
      expect(moveCol).toBe(2);
    });
  });
});
