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
