const app = require('./app')

const initialState = require('./initialState')

window.addEventListener('load', app(initialState))
