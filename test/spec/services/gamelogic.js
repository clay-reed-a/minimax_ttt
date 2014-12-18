'use strict';

describe('Service: gamelogic', function () {

  // load the service's module
  beforeEach(module('tictactoeApp'));

  // instantiate service
  var gamelogic;
  beforeEach(inject(function (_gamelogic_) {
    gamelogic = _gamelogic_;
  }));

  it('should do something', function () {
    expect(!!gamelogic).toBe(true);
  });

});
