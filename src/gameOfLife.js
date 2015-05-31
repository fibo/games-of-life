
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

      return count
    }

    /**
     * @params {*} cell
     * @returns {Boolean} status of the cell
     */

    function isAliveNext (cell) {
      var isAlive         = isAliveNow(cell),
          neighboursAlive = countNeighboursAlive(cell)

      var underPopulation = (isAlive    && (neighboursAlive  <  a)),
          generation      = (isAlive    && ((neighboursAlive >= a) || (neighboursAlive <= b))),
          overCrowding    = (isAlive    && (neighboursAlive  >  b)),
          reproduction    = ((!isAlive) && (neighboursAlive === c))

      if (underPopulation) {
        return false
      }

      if (generation) {
        return true
      }

      if (overCrowding) {
        return false
      }

      if (reproduction) {
        return true
      }
      else {
        return false
      }
    }

    return isAliveNext
  }

  return evolve
}

module.exports = gameOfLife

