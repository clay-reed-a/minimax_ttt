'use strict';

describe('Service: aILogic', function () {

  // load the service's module
  beforeEach(module('tictactoeApp'));

  // instantiate service
  var aILogic;
  beforeEach(inject(function (_aILogic_) {
    aILogic = _aILogic_;
  }));

  it('should do something', function () {
    expect(!!aILogic).toBe(true);
  });

});
