// var gamesOfLife = require('games-of-life')
// var createWorld = gamesOfLife.createWorld
// var transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)
// var hexagonal = gamesOfLife.space.hexagonal

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App'

import initialState from './store/initialState.json'

const store = configureStore(initialState)

const containerId = 'demo'
var container = document.getElementById(containerId)

if (!container) {
  container = document.createElement('div')
  container.id = containerId
  document.body.appendChild(container)
}

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  container
)
