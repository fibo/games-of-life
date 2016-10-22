import React from 'react'
import World from './World'

const Root = ({
  alive,
  coordinate,
  dispatch,
  isRunning
}) => (
  <div>
    <button>start</button>
    <World
      coordinate={coordinate} alive={alive}
      dispatch={dispatch}
      height={600} width={800}
      isRunning={isRunning}
    />
  </div>
)

export default Root
