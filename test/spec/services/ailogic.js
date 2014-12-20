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
      'bucketed into three sets\n'+
      'ordered according to desirablity', function() {
        var legal_moves_return = AiLogic.legalMoves(); 
        expect(legal_moves_return.length).toBe(3); 

        var legal_moves = 0;
        for(var i = 0; i < legal_moves_return.length; i++) {
     

          legal_moves = legal_moves + legal_moves_return[i].length;  
        }
        expect(legal_moves).toBe(9);
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
      var corner_moves = [[0,0], [0,2], [2,0], [2,2]];
      var found = false; 

      for (var c = 0; c < corner_moves.length; c++) {
        var corner_move = corner_moves[c];
        if ((move[0] === corner_move[0]
                   ) && (
            move[1] === corner_move[1])) {

                found = true; 
        }
      }
      
      expect(found).toBe(true);
    });

    it('should choose a side if corners are not available', function() {
      // implementation has top side first 
      /* game situation   
       where this is possible w/o AI choosing to win 
          o| |x
          -----
          x|x|o
          -----
          o| |x

      */ 
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
      var either_side = false; 
      var available_sides = [[0,1],[2,1]]; 

      if (((available_sides[0][0] === moveRow)
                      &&
        (available_sides[0][1] === moveCol)) 
                      ||
        ((available_sides[1][0] === moveRow)
                      &&
        (available_sides[1][1] === moveCol))) {
        either_side = true; 
      }

      expect(either_side).toBe(true);
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
      board[0][0].space = 'x';
      board[1][1].space = 'x';

      move = AiLogic.decideMove(board);
      moveRow = move[0],
      moveCol = move[1];

      expect(moveRow).toBe(2);
      expect(moveCol).toBe(2);
    });
  });
});
