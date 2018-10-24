const gamesOfLife = require('games-of-life')

const evolveRule = gamesOfLife.createWorld(
  gamesOfLife.space.hexagonal
)(
  gamesOfLife.classicTransitionRule.bind(null, 1, 2, 3)
)

function reducer (currenState, action) {
  const state = Object.assign({}, currenState)

  switch (action.type) {
    case 'ADD_COLUMN': // Add a column, i.e. a cell to every row.
      for (let i in state.cells) {
        state.cells[i].push({
          alive: Math.random() > 0.71
        })
      }

      return state

    case 'ADD_ROW': // Add a row with one cell.
      state.cells.push([
        {
          alive: Math.random() < 0.17
        }
      ])

      return state

    case 'EVOLVE':
      const isAliveNow = (coord) => {
        const [i, j] = coord

        if (typeof currenState.cells[i] === 'undefined') {
          return false
        } else {
          if (typeof currenState.cells[i][j] === 'undefined') {
            return false
          } else {
            return currenState.cells[i][j].alive
          }
        }
      }

      const isAliveNext = evolveRule(isAliveNow)

      state.cells.forEach((row, i) => {
        row.forEach((cell, j) => {
          state.cells[i][j].alive = isAliveNext([i, j])
        })
      })

      return state

    case 'PLAY':
      state.play = true

      return state

    case 'RESIZE':
      // This is handled by World component, no need to modify state.
      // This event is dispatched just to trigger a render cycle.

      return state

    case 'STOP':
      state.play = false

      return state

    case 'TOGGLE_CELL':
      const [i, j] = action.coordinates

      state.cells[i][j].alive = !state.cells[i][j].alive

      return state

    default: return state
  }
}

module.exports = reducer
