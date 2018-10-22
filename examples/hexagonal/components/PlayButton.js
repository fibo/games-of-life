const SvgIcon = require('./SvgIcon')

const playShape = 'M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'
const stopShape = 'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z'

class PlayButton extends SvgIcon {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.element.onclick = this.onclick.bind(this)
  }

  onclick () {
    this.dispatch({
      type: this.play ? 'STOP' : 'PLAY'
    })
  }

  render (state) {
    if (this.play !== state.play) {
      if (state.play) {
        this.path.setAttributeNS(null, 'd', stopShape)
      } else {
        this.path.setAttributeNS(null, 'd', playShape)
      }

      this.play = state.play
    }
  }
}

module.exports = PlayButton
