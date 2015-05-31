
var debug = require('debug')('GoL')

/**
 * @params {Function} getNeighbours
 * @returns {Function} evolve
 */

function gameOfLife (getNeighbours) {
  var a = arguments[1] || 2,
      b = arguments[2] || 3,
      c = arguments[3] || 3

  /**
   * @params {Function} isAliveNow
   * @returns {Function} isAliveNext
   */

  function evolve (isAliveNow) {

    /**
     * @params {*} cell
     * @returns {Number} count
     */

    function countNeighboursAlive (cell) {
      var count = 0

      var neighbours = getNeighbours(cell)

      for (var i = 0; i < neighbours.length; i++)
        if (isAliveNow(neighbours[i]))
          count++

      debug('found ' + count + ' neighbours')

      return count
    }

    /**
     * @params {*} cell
     * @returns {Boolean} status
     */

    function isAliveNext (cell) {
      var alive           = false,
          isAlive         = isAliveNow(cell),
          neighboursAlive = countNeighboursAlive(cell)

      var underPopulation = (isAlive    && (neighboursAlive  <  a)),
          generation      = (isAlive    && ((neighboursAlive >= a) || (neighboursAlive <= b))),
          overCrowoding   = (isAlive    && (neighboursAlive  >  b)),
          reproduction    = ((!isAlive) && (neighboursAlive === c))

      if (underPopulation) alive = false

      if (generation)      alive = true

      if (overCrowoding)   alive = true

      if (reproduction)    alive = true

      return alive
    }

    return isAliveNext
  }

  return evolve
}

module.exports = gameOfLife

