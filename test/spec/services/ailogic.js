'use strict';

describe('Service: AiLogic', function () {

  // load the service's module
  beforeEach(module('tictactoeApp'));

  // instantiate service
  var AiLogic, 
      GameLogic;
  beforeEach(inject(function (_AiLogic_, _GameLogic_) {
    AiLogic = _AiLogic_;
    GameLogic = _GameLogic_;
  }));

  describe('#legalMoves', function() {
    it('should return an list of 9 possible legal moves\n'+
      'ordered according to desirablity', function() {
        expect(AiLogic.legalMoves().length).toBe(9); 
      });
  });

  describe('#decideMove', function() {
    it('should recognize when it can win', function() {
      var board = GameLogic.newBoard();
      board[0][0].space = 'o';
      board[1][0].space = 'o';
      board[2][0].space = '';

      expect(AiLogic.decideMove(board)[0]).toBe(2);
      expect(AiLogic.decideMove(board)[1]).toBe(0);
    });
  });
});
