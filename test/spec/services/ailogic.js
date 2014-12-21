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
      'bucketed into three sets\n'+
      'ordered according to desirablity', function() {
        var legalMovesGroups = AiLogic.legalMoves(); 
        expect(legalMovesGroups.length).toBe(3); 

        var legalMovesCount = 0;
        for(var i = 0; i < legalMovesGroups.length; i++) {
          var legalMovesGroup = legalMovesGroups[i]; 

          legalMovesCount = legalMovesCount + legalMovesGroup.length;  
        }
        expect(legalMovesCount).toBe(9);
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
        moveRow = move[0]; 
        moveCol = move[1];
        expect(moveRow).toBe(1);
        expect(moveCol).toBe(1);
    }); 

    it('should choose a corner if center is not available', function() {
      board[1][1].space = 'x';
      move = AiLogic.decideMove(board);
      var cornerMoves = [[0,0], [0,2], [2,0], [2,2]];
      var found = false; 

      for (var c = 0; c < cornerMoves.length; c++) {
        var cornerMove = cornerMoves[c];
        if ((move[0] === cornerMove[0]) && 
            (move[1] === cornerMove[1])) 
        {

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
      moveRow = move[0];
      moveCol = move[1];
      var eitherSide = false; 
      var availableSides = [[0,1],[2,1]]; 

      if (((availableSides[0][0] === moveRow) &&
           (availableSides[0][1] === moveCol)) ||
          ((availableSides[1][0] === moveRow) &&
           (availableSides[1][1] === moveCol))) 
      {
        eitherSide = true; 
      }

      expect(eitherSide).toBe(true);
    });

    it('should recognize when it can win', function() {
      
      board[0][0].space = 'o';
      board[1][0].space = 'o';

      move = AiLogic.decideMove(board);
      moveRow = move[0]; 
      moveCol = move[1];

      expect(moveRow).toBe(2);
      expect(moveCol).toBe(0);
    });

    it('should block other player\'s wins', function() {
      board[0][0].space = 'x';
      board[1][1].space = 'x';

      move = AiLogic.decideMove(board);
      moveRow = move[0];
      moveCol = move[1];

      expect(moveRow).toBe(2);
      expect(moveCol).toBe(2);
    });
  });
});
