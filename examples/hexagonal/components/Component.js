class Component {
  constructor (dispatch, element) {
    this.dispatch = dispatch
    this.element = element

    this.component = {}
  }

  createElementNS (qualifiedName) {
    const namespaceURI = 'http://www.w3.org/2000/svg'

    const element = document.createElementNS(namespaceURI, qualifiedName)

    this.element.appendChild(element)

    return element
  }

  render (state) {
    var component = this.component

    Object.keys(component).forEach(function (key) {
      component[key].render(state)
    })
  }
}

module.exports = Component
