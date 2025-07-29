import { Component } from './Component.js'
import { PlayButton } from './PlayButton.js'

export class Footer extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.playButton = new PlayButton(dispatch, document.querySelector('.PlayButton'))
  }
}
