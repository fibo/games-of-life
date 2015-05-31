
var countAliveNeighbours = require('./countAliveNeighbours')

/**
 * @params {Function} getNeighboursOf
 * @params {Number} [a=2] under population threshold
 * @params {Number} [b=3] over crowding threshold
 * @params {Number} [c=3] reproduction value
 *
 * @returns {Function} evolve
 */

function gameOfLife (getNeighboursOf) {
  var a = arguments[1] || 2,
      b = arguments[2] || 3,
      c = arguments[3] || 3

  /**
   * @params {Function} isAliveNow
   * @returns {Function} isAliveNext
   */

  function evolve (isAliveNow) {
    var countAliveNeighboursOf = countAliveNeighbours.bind(null, getNeighboursOf, isAliveNow)


    /**
     * @params {*} cell
     * @returns {Boolean} status of the cell
     */

    function isAliveNext (cell) {
      var numNeighboursAlive = countAliveNeighboursOf(cell)

      if (isAliveNow(cell))
        return ((numNeighboursAlive >= a) && (numNeighboursAlive <= b))
      else
        return (numNeighboursAlive === c)
    }

    return isAliveNext
  }

  return evolve
}

module.exports = gameOfLife

