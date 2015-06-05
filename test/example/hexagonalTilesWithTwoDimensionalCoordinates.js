
var should = require('should')

var gamesOfLife = require('games-of-life')

var createWorld    = gamesOfLife.createWorld,
    transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)
    hexagonal      = gamesOfLife.space.hexagonal

var world = createWorld(hexagonal)

var evolve = world(transitionRule)

describe('hexagonalTilesWithTwoDimensionalCoordinates', function () {

  describe('evolve', function () {
    it('as expected'/*, function () {
    }*/)
  })
})

