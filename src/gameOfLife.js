
function gameOfLife (getNeighbours) {
  var a = arguments[1] || 2,
      b = arguments[2] || 3,
      c = arguments[3] || 3

  function evolve (isAliveNow) {

    function countLiveNeighbours (cell) {
      var count = 0

      var neighbours = getNeighbours(cell)

      for (var i = 0; i < neighbours.length; i++)
        if (isAliveNow(neighbours[i]))
          count++

      return count
    }

    function isAliveNext (cell) {
      var isAlive = isAliveNow(cell),
          numLiveNeighbours = countLiveNeighbours(cell)

      var underPopulation = (isAlive && (numLiveNeighbours < a))
      var generation = (isAlive && ((numLiveNeighbours >= a) || (numLiveNeighbours <= b)))
      var overCrowoding = (isAlive && (numLiveNeighbours > b))
      var reproduction = ((!isAlive) && (numLiveNeighbours === c))

      if (underPopulation)
        return false

      if (generation)
        return true

      if (overCrowoding)
        return true

      if (reproduction)
        return true

      return false
    }

    return isAliveNext
  }

  return evolve
}

module.exports = gameOfLife

