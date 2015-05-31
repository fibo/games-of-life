
var should = require('should')

var countAliveNeighbours = require('../src/countAliveNeighbours')

describe('countAliveNeighbours', function () {

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

  function emptyGrid (cell) {
    return false
  }

  function fullGrid (cell) {
    return true
  }

  function secondColumn (cell) {
    return (cell === 1) || (cell === 4) || (cell === 7)
  }

  function secondRow (cell) {
    return (cell === 3) || (cell === 4) || (cell === 5)
  }

  function cross (cell) {
    return secondRow(cell) || secondColumn(cell)
  }

  var countAliveNeighboursOfEmptyGrid    = countAliveNeighbours.bind(null, getNeighboursOf, emptyGrid)
  var countAliveNeighboursOfFullGrid     = countAliveNeighbours.bind(null, getNeighboursOf, fullGrid)
  var countAliveNeighboursOfSecondColumn = countAliveNeighbours.bind(null, getNeighboursOf, secondColumn)
  var countAliveNeighboursOfSecondRow    = countAliveNeighbours.bind(null, getNeighboursOf, secondRow)
  var countAliveNeighboursOfCross        = countAliveNeighbours.bind(null, getNeighboursOf, cross)

  it('works', function () {
    var i, count

    count = [0, 0, 0,
             0, 0, 0,
             0, 0, 0]
    for (i in count) countAliveNeighboursOfEmptyGrid(i).should.be.eql(count[i])

    count = [3, 5, 3,
             5, 8, 5,
             3, 5, 3]
    for (i in count) countAliveNeighboursOfFullGrid(i).should.be.eql(count[i])

    count = [2, 1, 2,
             3, 2, 3,
             2, 1, 2]
    for (i in count) countAliveNeighboursOfSecondColumn(i).should.be.eql(count[i])

    count = [2, 3, 2,
             1, 2, 1,
             2, 3, 2]
    for (i in count) countAliveNeighboursOfSecondRow(i).should.be.eql(count[i])

    count = [3, 3, 3,
             3, 4, 3,
             3, 3, 3]
    for (i in count) countAliveNeighboursOfCross(i).should.be.eql(count[i])
  })
})

