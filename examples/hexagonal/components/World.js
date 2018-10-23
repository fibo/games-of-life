const Component = require('./Component')

const Hexagon = require('./Hexagon')

class World extends Component {
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
      element
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

    if (currentHeight < element.clientHeight) {
      setTimeout(() => {
        this.dispatch({ type: 'ADD_ROW' })
      }, 10)
    } else if (currentWidth < element.clientWidth) {
      setTimeout(() => {
        this.dispatch({ type: 'ADD_COLUMN' })
      }, 17)
    }
  }
}

module.exports = World
