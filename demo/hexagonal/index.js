// var gamesOfLife = require('games-of-life')
// var createWorld = gamesOfLife.createWorld
// var transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)
// var hexagonal = gamesOfLife.space.hexagonal

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

const containerId = 'demo'
var container = document.getElementById(containerId)

if (!container) {
  container = document.createElement('div')
  container.id = containerId
  document.body.appendChild(container)
}

render(<Root />, container)
