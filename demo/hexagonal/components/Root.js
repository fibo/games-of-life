import React, { Component } from 'react'
import World from './World'
import { isRunning } from '../store/initialState'

class Root extends Component {
  constructor () {
    super()

    this.state = { isRunning }
  }

  render () {
    const {
      isRunning
    } = this.state

    const toggleIsRunning = () => {
      this.setState({ isRunning: !isRunning })
    }

    return (
      <div>
        <div>
          <button onClick={toggleIsRunning}>{isRunning ? 'stop' : 'start'}</button>
        </div>
        <div>
          <World
            isRunning={isRunning}
            height={600}
            width={800}
          />
        </div>
      </div>
    )
  }
}

export default Root
