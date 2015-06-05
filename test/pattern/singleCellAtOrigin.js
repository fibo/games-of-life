
var should = require('should')

var gamesOfLife = require('games-of-life')

var singleCellAtOrigin = gamesOfLife.pattern.singleCellAtOrigin

describe('singleCellAtOrigin', function () {
  it('returns true if all coordinates are zero', function () {
    singleCellAtOrigin([0, 0]).should.be.true
  })

  it('returns false if some coordinates is not zero', function () {
    singleCellAtOrigin([1, 0]).should.be.false
  })
})

