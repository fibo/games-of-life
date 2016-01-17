(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = require('./src/')


},{"./src/":5}],2:[function(require,module,exports){
var countAliveNeighbours = require('./countAliveNeighbours')

/**
 *
 * 1. Any live cell with fewer than `a` live neighbours dies, as if caused by under-population.
 * 2. Any live cell with `a` or `b` live neighbours lives on to the next generation.
 * 3. Any live cell with more than `b` live neighbours dies, as if by overcrowding.
 * 4. Any dead cell with exactly `c` live neighbours becomes a live cell, as if by reproduction.
 *
 * where in the classic *Game of Life*,
 *
 * ```
 * a = 2
 * b = 3
 * c = 3
 * ```
 *
 * @params {Number} a under population threshold
 * @params {Number} b over crowding threshold
 * @params {Number} c reproduction value
 * @params {Function} getNeighboursOf
 * @params {Function} isAlive
 *
 * @returns {Function} nextStatusOf (cell)
 */

function classicTransitionRule (a, b, c, getNeighboursOf, isAlive) {
  var countAliveNeighboursOf = countAliveNeighbours.bind(null, getNeighboursOf, isAlive)

  /**
   * @param {*} cell
   * @returns {Boolean} status
   */

  function nextStatusOf (cell) {
    var numNeighboursAlive = countAliveNeighboursOf(cell)

    if (isAlive(cell)) {
      return ((numNeighboursAlive >= a) && (numNeighboursAlive <= b))
    } else {
      return (numNeighboursAlive === c)
    }
  }

  return nextStatusOf
}

module.exports = classicTransitionRule

},{"./countAliveNeighbours":3}],3:[function(require,module,exports){

/**
 * @params {Function} getNeighboursOf
 * @params {Function} isAlive
 * @params {*} cell
 * @returns {Number} count
 */

function countAliveNeighbours (getNeighboursOf, isAlive, cell) {
  return getNeighboursOf(cell).filter(isAlive).length
}

module.exports = countAliveNeighbours


},{}],4:[function(require,module,exports){
var classicTransitionRule = require('./classicTransitionRule')

/**
 * Create a GoL world.
 *
 * @params {Function} getNeighboursOf
 * @returns {Function} world
 */

function createWorld (getNeighboursOf) {
  /**
   * @params {Function} [transitionRule] defaults to classis GoL transition rule
   * @returns {Function} evolve
   */

  function world (transitionRule) {
    if (typeof transitionRule === 'undefined') {
      transitionRule = classicTransitionRule.bind(null, 2, 3, 3)
    }

    /**
     * @params {Function} isAliveNow
     * @returns {Function} isAliveNext
     */

    function evolve (isAliveNow) {
      var nextStatusOf = transitionRule(getNeighboursOf, isAliveNow)

      /**
       * @params {*} cell
       * @returns {Boolean} status of the cell
       */

      function isAliveNext (cell) {
        return nextStatusOf(cell)
      }

      return isAliveNext
    }

    return evolve
  }

  return world
}

module.exports = createWorld

},{"./classicTransitionRule":2}],5:[function(require,module,exports){

exports.classicTransitionRule = require('./classicTransitionRule')

exports.countAliveNeighbours = require('./countAliveNeighbours')

exports.createWorld = require('./createWorld')

exports.pattern = require('./pattern')

exports.space = require('./space')


},{"./classicTransitionRule":2,"./countAliveNeighbours":3,"./createWorld":4,"./pattern":7,"./space":11}],6:[function(require,module,exports){

/**
 * @returns {Boolean} false
 */

function emptySpace () {
  return false
}

module.exports = emptySpace


},{}],7:[function(require,module,exports){

exports.emptySpace = require('./emptySpace')

exports.singleCell = require('./singleCell')

exports.singleCellAtOrigin = require('./singleCellAtOrigin')


},{"./emptySpace":6,"./singleCell":8,"./singleCellAtOrigin":9}],8:[function(require,module,exports){

var singleCellAtOrigin = require('./singleCellAtOrigin')

/**
 * @params {Array} cell
 * @returns {Function} isAlive
 */

function singleCell (coordinates) {

  function isAlive (cell) {
    var translatedCell = []

    for (var i in cell)
      translatedCell.push(cell[i] - coordinates[i])

    return singleCellAtOrigin(translatedCell)
  }

  return isAlive
}

module.exports = singleCell


},{"./singleCellAtOrigin":9}],9:[function(require,module,exports){

/**
 * @params {Array} cell
 * @returns {Boolean} status
 */

function singleCellAtOrigin (cell) {
  function isZero (coordinate) {
    return coordinate === 0
  }

  return cell.filter(isZero).length === cell.length
}

module.exports = singleCellAtOrigin


},{}],10:[function(require,module,exports){

/**
 * Defines an hexagonal tiling with well defined 2d coordinates
 *
 * The natural mathematics to describe an hexagonal tiling is given by [Eisenstein integers](http://en.wikipedia.org/wiki/Eisenstein_integer).
 *
 * The cube root of unit ω is given by
 *
 * ![omega coordinates](http://upload.wikimedia.org/math/0/e/3/0e396c16b84893b618487309549952fe.png)
 *
 * My first idea was to use a sort of three dimensional coordinates
 *
 * ```
 * x = 2 + ω
 * y = 1 + 2 ω
 * z = ω - 1
 * ```
 *
 * ```
 *                 Y axis
 *                                               X axis
 *                 0,1,1                  3,0,0
 *  Z axis
 *
 *    0,0,2        0,1,0           2,0,0
 *
 *          0,0,1         1,0,0
 *
 *     o           0,0,0             o
 *
 *         -1,0,0          0,0,-1            o
 *
 *                0,-1,0           0,0,-2
 *
 *            o              o
 *
 *                0,-2,0
 * ```
 *
 * then, applying condition `y = z + x` everything makes sense.
 * Yes, cause it is like a plane in 3d so coordinates reduces to two and furthermore, it is geometrically well defined, i.e. it makes coordinates linear.
 *
 *
 * ```
 *                 1, 1
 *
 *          0, 1          2, 0
 *
 *   -1, 1         1, 0          1, 1
 *
 *          0, 0          2,-1
 *
 *   -1, 0         1,-1
 *
 *          0,-1
 * ```
 *
 * @params {Array} cell
 * @returns {Array} neighbours
 */

function hexagonal (cell) {
  var x = cell[0],
      y = cell[1]

  var neighbours = [[x-1, y+1], [x, y+1], [x+1, y],
                    [x-1, y], [x, y-1], [x+1, y-1]]

  return neighbours
}

module.exports = hexagonal


},{}],11:[function(require,module,exports){

exports.hexagonal = require('./hexagonal')


},{"./hexagonal":10}],12:[function(require,module,exports){
var countAliveNeighbours = require('..').countAliveNeighbours

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

  var countAliveNeighboursOfEmptyGrid = countAliveNeighbours.bind(null, getNeighboursOf, emptyGrid)
  var countAliveNeighboursOfFullGrid = countAliveNeighbours.bind(null, getNeighboursOf, fullGrid)
  var countAliveNeighboursOfSecondColumn = countAliveNeighbours.bind(null, getNeighboursOf, secondColumn)
  var countAliveNeighboursOfSecondRow = countAliveNeighbours.bind(null, getNeighboursOf, secondRow)
  var countAliveNeighboursOfCross = countAliveNeighbours.bind(null, getNeighboursOf, cross)

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


},{"..":1}]},{},[12]);
