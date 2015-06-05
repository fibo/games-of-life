
var should = require('should')

var gamesOfLife = require('games-of-life')

var createWorld    = gamesOfLife.createWorld,
    transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)

/**
 * @params {Array} cell
 * @returns {Array} neighbours
 */

function getNeighboursOf (cell) {
  var x = cell[0],
      y = cell[1]

  var neighbours = []

  for (var j = y - 1; j <= y + 1; j++) {
    for (var i = x - 1; i <= x + 1; i++) {
      if ((i === x) && (j === y))
        continue

      neighbours.push([i, j])
    }
  }

  return neighbours
}

var world = createWorld(getNeighboursOf)

var evolve = world(transitionRule)

describe('infiniteGridWithTwoDimensionalCoordinates', function () {

  describe('getNeighboursOf', function () {
    it('is well defined', function () {
      var neighbours = getNeighboursOf([2, 3])

      should.deepEqual(neighbours, [
        [1, 2], [2, 2], [3, 2],
        [1, 3],         [3, 3],
        [1, 4], [2, 4], [3, 4]
      ])
    })
  })

  function patternsAreEqual (patternA, patternB) {
    var areEqual = true

    for (var i = -20; i < 20; i++)
      for (var j = -20; j < 20; j++)
        if (patternA(i, j) !== patternB(i, j))
          areEqual = false

    return areEqual
  }

  describe('patternsAreEqual', function () {
    it ('is a reflection', function () {
      patternsAreEqual(horyzontalBlinker, horyzontalBlinker).should.be.true
      patternsAreEqual(verticalBlinker, verticalBlinker).should.be.true
      patternsAreEqual(emptyGrid, emptyGrid).should.be.true
    })
  })

  function emptyGrid () {
    return false
  }

  function singleCellAtTheOrigin (cell) {
    return ((cell[0] === 0) && (cell[1] === 0))
  }

  function horyzontalBlinker (cell) {
    var x = cell[0],
        y = cell[1]

    if (y !== 0)
      return false

    if ((x >= -1) && (x <= 1))
      return true

    return false
  }

  function verticalBlinker (cell) {
    var x = cell[0],
        y = cell[1]

    if (x !== 0)
      return false

    if ((y >= -1) && (y <= 1))
      return true

    return false
  }

  describe('evolve', function () {
    it('as expected', function () {
      patternsAreEqual(evolve(emptyGrid), emptyGrid).should.be.true
      patternsAreEqual(evolve(singleCellAtTheOrigin), emptyGrid).should.be.true
      patternsAreEqual(evolve(verticalBlinker), horyzontalBlinker).should.be.true
      patternsAreEqual(evolve(horyzontalBlinker), verticalBlinker).should.be.true
      patternsAreEqual(evolve(evolve(horyzontalBlinker)), horyzontalBlinker).should.be.true
    })
  })
})

