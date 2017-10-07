/**
 * Counts alive cells nearby.
 *
 * @param {Function} getNeighboursOf
 * @param {Function} isAlive
 * @param {*} cell
 * @returns {Number} count
 */

function countAliveNeighbours (getNeighboursOf, isAlive, cell) {
  return getNeighboursOf(cell).filter(isAlive).length
}

module.exports = countAliveNeighbours
