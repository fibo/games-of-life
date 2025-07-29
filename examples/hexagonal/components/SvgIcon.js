import { Component } from './Component.js'

export class SvgIcon extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    // This app uses Font Awesome icons which have all the following viewBox.
    element.setAttributeNS(null, 'viewBox', '0 0 448 512')

    this.path = this.createElementNS('path')
  }
}
