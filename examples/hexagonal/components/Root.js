import { Component } from './Component.js'
import { Footer } from './Footer.js'
import { World } from './World.js'

export class Root extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.footer = new Footer(dispatch, document.querySelector('footer'))

    this.component.world = new World(dispatch, document.querySelector('svg.World'))

    window.addEventListener('resize', () => {
      dispatch({ type: 'RESIZE' })
    })
  }
}
