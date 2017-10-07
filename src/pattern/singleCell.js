var singleCellAtOrigin = require('./singleCellAtOrigin')

/**
 * @param {Array} coordinates of cell
 * @returns {Function} isAlive
 */

function singleCell (coordinates) {
  return function isAlive (cell) {
    var translatedCell = []

    for (var i in cell) translatedCell.push(cell[i] - coordinates[i])

    return singleCellAtOrigin(translatedCell)
  }
}

module.exports = singleCell
