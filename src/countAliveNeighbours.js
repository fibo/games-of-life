
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

