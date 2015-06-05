
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

