var gamesOfLife = require('games-of-life')
var createWorld = gamesOfLife.createWorld
var transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)
var hexagonal = gamesOfLife.space.hexagonal

var React = require('react')
var render = require('react-dom').render
var Provider = require('react-redux').Provider

var containerId = 'demo'

var container = document.getElementById(containerId)

if (!container) {
  container = document.createElement('div')
  container.id = containerId
  document.body.appendChild(container)
}

render(
  <Provider store={store}>
    <App view={{ container }} />
  </Provider>,
  container
)
