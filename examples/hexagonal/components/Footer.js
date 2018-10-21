const Component = require('./Component')

const PlayButton = require('./PlayButton')

class Footer extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.playButton = new PlayButton(dispatch, document.querySelector('.PlayButton'))
  }
}

module.exports = Footer
