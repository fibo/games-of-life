import { Root } from './components/Root.js'
import { reducer } from './reducer.js';

/**
 * App loader.
 *
 * window.addEventListener('load', app(state))
 */

export function app (initialState) {
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
