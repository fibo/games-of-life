
var should = require('should')

var gameOfLife = require('..')

describe('grid3x3AsMonodimensionalArray', function () {

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

  var evolve = new gameOfLife(getNeighboursOf)

  function configuration0 (cell) {
    return false
  }

  function configuration1 (cell) {
    return cell === 0
  }

  function configurationHoryzontalBlinker (cell) {
    return (cell === 3) || (cell === 4) || (cell === 5)
  }

  function configurationVerticalBlinker (cell) {
    return (cell === 1) || (cell === 4) || (cell === 7)
  }

  function configurationsAreEqual (configurationA, configurationB) {
    var areEqual = true

    for (var i = 0; i < 9; i++)
      if (configurationA(i) !== configurationB(i))
        areEqual = false

    return areEqual
  }

  describe('configurationsAreEqual', function () {
    it ('is a reflection', function () {
      configurationsAreEqual(configuration0, configuration0).should.be.true
      configurationsAreEqual(configuration1, configuration1).should.be.true
      configurationsAreEqual(configurationHoryzontalBlinker, configurationHoryzontalBlinker).should.be.true
    })
  })

  describe('evolve', function () {
    it('as expected', function () {
      console.log(evolve(configuration1)(0))
      configurationsAreEqual(evolve(configuration1), configuration0).should.be.true
      configurationsAreEqual(evolve(configurationVerticalBlinker), configurationHoryzontalBlinker).should.be.true
      configurationsAreEqual(evolve(configurationHoryzontalBlinker), configurationVerticalBlinker).should.be.true
      configurationsAreEqual(evolve(evolve(configurationHoryzontalBlinker)), configurationHoryzontalBlinker).should.be.true
    })
  })
})

