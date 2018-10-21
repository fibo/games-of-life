const Component = require('./Component')

const Hexagon = require('./Hexagon')

class World extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    const polygon = this.createElementNS('polygon')
    this.component.hexagon = new Hexagon(dispatch, polygon)
  }
}

module.exports = World
