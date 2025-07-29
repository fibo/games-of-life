export class Component {
  constructor (dispatch, element) {
    this.dispatch = dispatch
    this.element = element

    this.component = {}
  }

  createElement (qualifiedName) {
    const element = document.createElement(qualifiedName)

    this.element.appendChild(element)

    return element
  }

  createElementNS (qualifiedName) {
    const namespaceURI = 'http://www.w3.org/2000/svg'

    const element = document.createElementNS(namespaceURI, qualifiedName)

    this.element.appendChild(element)

    return element
  }

  render (state) {
    Object.values(this.component).forEach(
      (component) => component.render(state)
    )
  }
}
