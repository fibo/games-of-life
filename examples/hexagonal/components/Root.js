const Component = require('./Component')

const Footer = require('./Footer')
const World = require('./World')

class Root extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.footer = new Footer(dispatch, document.querySelector('footer'))

    this.component.world = new World(dispatch, document.querySelector('svg.World'))

    window.addEventListener('resize', () => {
      dispatch({ type: 'RESIZE' })
    })
  }
}

module.exports = Root
