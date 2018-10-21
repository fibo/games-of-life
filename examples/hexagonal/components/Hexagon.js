const Component = require('./Component')

class Hexagon extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.element.onclick = this.onclick.bind(this)
  }

  onclick () {}

  render (state) {
    if (state.unit !== this.unit) {
      const unit = this.unit = state.unit

      const rad60 = 2 * Math.PI / 6
      const cos60 = Math.cos(rad60)
      const sin60 = Math.sin(rad60)

      const A = { x: unit, y: 0 }
      const B = { x: cos60 * unit, y: sin60 * unit }
      const C = { x: -cos60 * unit, y: sin60 * unit }
      const D = { x: -unit, y: 0 }
      const E = { x: -cos60 * unit, y: -sin60 * unit }
      const F = { x: cos60 * unit, y: -sin60 * unit }

      const points = `${A.x} ${A.y} ${B.x} ${B.y} ${C.x} ${C.y} ${D.x} ${D.y} ${E.x} ${E.y} ${F.x} ${F.y}`

      this.element.setAttributeNS(null, 'points', points)
    }
  }
}

module.exports = Hexagon
