
var should = require('should')

var gamesOfLife = require('..')

var createWorld    = gamesOfLife.createWorld,
    transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)

/**
 * @params {Number} cell represented by an array index
 * @returns {Array} neighboursOf
 */

function getNeighboursOf (index) {
  var neighboursOf = {
    0: [1, 3, 4],
    1: [0, 2, 3, 4, 5],
    2: [1, 4, 5],
    3: [0, 1, 4, 6, 7],
    4: [0, 1, 2, 3, 5, 6, 7, 8],
    5: [1, 2, 4, 7, 8],
    6: [3, 4, 7],
    7: [3, 4, 5, 6, 8],
    8: [4, 5, 7]
  }

  return neighboursOf[index]
}

var world = createWorld(getNeighboursOf)

var evolve = world(transitionRule)

describe('grid3x3AsMonoDimensionalArray', function () {

  function getNeighboursOf (index) {
    var neighboursOf = {
      0: [1, 3, 4],
      1: [0, 2, 3, 4, 5],
      2: [1, 4, 5],
      3: [0, 1, 4, 6, 7],
      4: [0, 1, 2, 3, 5, 6, 7, 8],
      5: [1, 2, 4, 7, 8],
      6: [3, 4, 7],
      7: [3, 4, 5, 6, 8],
      8: [4, 5, 7]
    }

    return neighboursOf[index]
  }

  function pattern0 (cell) {
    return false
  }

  function pattern1 (cell) {
    return cell === 0
  }

  function horyzontalBlinker (cell) {
    return (cell === 3) || (cell === 4) || (cell === 5)
  }

  function verticalBlinker (cell) {
    return (cell === 1) || (cell === 4) || (cell === 7)
  }

  function patternsAreEqual (patternA, patternB) {
    var areEqual = true

    for (var i = 0; i < 9; i++)
      if (patternA(i) !== patternB(i))
        areEqual = false

    return areEqual
  }

  describe('patternsAreEqual', function () {
    it ('is a reflection', function () {
      patternsAreEqual(pattern0, pattern0).should.be.true
      patternsAreEqual(pattern1, pattern1).should.be.true
      patternsAreEqual(horyzontalBlinker, horyzontalBlinker).should.be.true
    })
  })

  describe('evolve', function () {
    it('as expected', function () {
      patternsAreEqual(evolve(pattern1), pattern0).should.be.true
      patternsAreEqual(evolve(verticalBlinker), horyzontalBlinker).should.be.true
      patternsAreEqual(evolve(horyzontalBlinker), verticalBlinker).should.be.true
      patternsAreEqual(evolve(evolve(horyzontalBlinker)), horyzontalBlinker).should.be.true
    })
  })
})

