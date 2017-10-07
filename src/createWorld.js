var classicTransitionRule = require('./classicTransitionRule')

/**
 * Create a GoL world.
 *
 * @param {Function} getNeighboursOf
 * @returns {Function} world
 */

function createWorld (getNeighboursOf) {
  /**
   * @param {Function} [transitionRule] defaults to classis GoL transition rule
   * @returns {Function} evolve
   */

  function world (transitionRule) {
    if (typeof transitionRule === 'undefined') {
      transitionRule = classicTransitionRule.bind(null, 2, 3, 3)
    }

    /**
     * @param {Function} isAliveNow
     * @returns {Function} isAliveNext
     */

    function evolve (isAliveNow) {
      var nextStatusOf = transitionRule(getNeighboursOf, isAliveNow)

      /**
       * @param {*} cell
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
