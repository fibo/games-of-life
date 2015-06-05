
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

