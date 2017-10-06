#!/usr/bin/env babel-node
import React from 'react'
import reactDom from 'react-dom/server'
import svgx from 'svgx'

import World from './components/World'

const render = svgx(reactDom.renderToStaticMarkup)

const svgOutput = render(<World />)

console.log(svgOutput)
