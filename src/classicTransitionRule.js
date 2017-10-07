var countAliveNeighbours = require('./countAliveNeighbours')

/**
 * Implements the followinf rules.
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
 * @param {Number} a under population threshold
 * @param {Number} b over crowding threshold
 * @param {Number} c reproduction value
 * @param {Function} getNeighboursOf
 * @param {Function} isAlive
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
