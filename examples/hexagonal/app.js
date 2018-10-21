const Root = require('./components/Root')
const reducer = require('./reducer')

/**
 * App loader.
 *
 * window.addEventListener('load', app(state))
 */

function app (initialState) {
  return function () {
    let currentState = initialState

    let render = Function.prototype

    function dispatch (action) {
      currentState = reducer(currentState, action)

      render(currentState)
    }

    const root = new Root(dispatch, document.body)

    render = root.render.bind(root)

    dispatch({ type: 'INIT' })
  }
}

module.exports = app
