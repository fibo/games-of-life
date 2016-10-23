import React, { PropTypes, Component } from 'react'
import Hexagon from './Hexagon'
import { alive, coordinate } from '../store/initialState'

class World extends Component {
  constructor () {
    super()

    this.state = {
      alive,
      coordinate
    }
  }

  evolve () {
    const {
      alive
    } = this.state

    let nextAlive = {}

    Object.keys(alive).forEach((id) => {
      nextAlive[id] = !alive[id]
    })

    this.setState({ alive: nextAlive })
  }

  render () {
    const {
      height,
      isRunning,
      quantumTime,
      width
    } = this.props

    const {
      alive,
      coordinate
    } = this.state

    const setState = this.setState.bind(this)

    // Yes, I know...
    // the render function should be pure, so it is intendend to not
    // modify the state here. But I am the god of this game of life
    // universe, shut up or I will create a monodimensional world
    // that will be your Inferno for ever!
    if (isRunning) setTimeout(this.evolve.bind(this), quantumTime)

    const cursor = isRunning ? 'not-allowed' : 'pointer'

    return (
      <svg
        style={{cursor}}
        height={height}
        width={width}
      >
        {Object.keys(coordinate).map((id, i) => {
          const coord = coordinate[id]

          const toggleCell = () => {
            alive[id] = !alive[id]

            setState({ alive })
          }

          return (
            <Hexagon key={i}
              alive={alive[id]}
              onClick={isRunning ? undefined : toggleCell}
              x={coord[0]}
              y={coord[1]}
            />
          )
        })}
      </svg>
    )
  }
}

World.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

World.defaultProps = {
  height: 300,
  quantumTime: 1000,
  width: 400
}

export default World
