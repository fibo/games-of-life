const Component = require('./Component')

const Footer = require('./Footer')
const Main = require('./Main')

class Root extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.footer = new Footer(dispatch, document.querySelector('footer'))

    this.component.main = new Main(dispatch, document.querySelector('main'))
  }
}

module.exports = Root
