#!/usr/bin/env babel-node
import React from 'react'
import World from './components/World'
import render from 'svgx'

console.log(render(<World />, { doctype: true, xmlns: true }))
