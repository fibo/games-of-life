
var createWorld    = gamesOfLife.createWorld,
    transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3),
    hexagonal      = gamesOfLife.space.hexagonal

// The example is hexagonal but limited.
var bound = 3

function limitedHexagonal (bound) {
  function getNeighbours (cell) {
    var limitedNeighbours = [],
        neighbours        = hexagonal(cell)

    for (var i in neighbours) {
      var neighbour = neighbours[i]

      if (neighbour[0] + neighbour[1] <= bound)
        limitedNeighbours.push(neighbour)
    }

    return limitedNeighbours
  }

  return getNeighbours
}

var world = createWorld(limitedHexagonal(bound))

var evolve = world(transitionRule)

function selectCell (x, y) {
  var selector = '.' + x.toString() + ' > .' + y.toString()

  return selector
}

function isAlive (cell) {
  var x = cell[0],
      y = cell[1]

  return $(selectCell(x, y)).hasClass('alive')
}

$('.hex').click(function() {
  $(this).toggleClass('alive')
})

$('#run').click(function() {
  var nextIsAlive = [],
      i, j

  // First compute results of next status.
  for (i = 0 - bound; i <= bound; i++) {
    var col = []

    for (j = 0 - bound; j <= bound; j++) {
      col.push(evolve(isAlive)([i, j]))
    }

    nextIsAlive.push(col)
  }

  console.log(nextIsAlive)

  // Then apply results.
  for (i = 0; i < 2 * bound; i++) {
    for (j = 0; j < 2 * bound; j++) {
      var $cell = $(selectCell(i - bound, j - bound))

      if (nextIsAlive[i][j]) {
        // Gift life to cell.
        if (! $cell.hasClass('alive'))
          $cell.toggleClass('alive')
      }
      else {
        // Kill cell.
        if ($cell.hasClass('alive'))
          $cell.toggleClass('alive')
      }
    }
  }
})

