import { Component } from './Component.js'
import { Hexagon } from './Hexagon.js'

const screenHeight = window.screen.height
const screenWidth = window.screen.width

export class World extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.cells = [[]]
  }

  createCell (coordinates) {
    const polygon = this.createElementNS('polygon')

    return new Hexagon(this.dispatch, polygon, coordinates)
  }

  render (state) {
    const {
      dispatch
    } = this

    const numRows = state.cells.length
    const numCols = numRows > 0 ? state.cells[0].length : 0

    while (this.cells.length < numRows) {
      this.cells.push([])
    }

    state.cells.forEach((row, i, rows) => {
      row.forEach((cell, j, cells) => {
        if (typeof this.cells[i][j] === 'undefined') {
          this.cells[i][j] = this.createCell([i, j])
        }

        this.cells[i][j].render(state)
      })
    })

    const currentHeight = numRows * state.unit * 2 * Math.sin(Math.PI / 3)
    const currentWidth = numCols * state.unit * 1.5

    // Fill space with cells, use setTimeout just to animate.

    if (currentHeight < screenHeight * 2) {
      setTimeout(() => {
        dispatch({ type: 'ADD_ROW' })
      }, 10)

      return
    } else if (currentWidth < screenWidth) {
      setTimeout(() => {
        dispatch({ type: 'ADD_COLUMN' })
      }, 17)

      return
    }

    // Note that *quantumTime* must be checked before *play*.
    if (state.quantumTime !== this.quantumTime) {
      this.quantumTime = state.quantumTime
    }

    if (state.play !== this.play) {
      if (state.play) {
        this.startGame()
      } else {
        this.stopGame()
      }

      this.play = state.play
    }
  }

  startGame () {
    this.loop = setInterval(() => {
      this.dispatch({ type: 'EVOLVE' })
    }, this.quantumTime)
  }

  stopGame () {
    clearInterval(this.loop)
  }
}
