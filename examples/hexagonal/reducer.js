function reducer (currenState, action) {
  const state = Object.assign({}, currenState)

  switch (action.type) {
    case 'PLAY':
      state.play = true

      return state

    case 'STOP':
      state.play = false

      return state

    default: return state
  }
}

module.exports = reducer
