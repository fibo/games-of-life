import React from 'react'
import Hexagon from './Hexagon'
import { alive, coordinate } from '../store/initialState'
import gamesOfLife from 'games-of-life'

export default class World extends React.Component {
  constructor () {
    super()

    this.state = {
      alive,
      coordinate
    }
  }

  componentDidMount () {
    const getNeighboursOf = this.getNeighboursOf.bind(this)

    this.evolveRule = gamesOfLife.createWorld(getNeighboursOf)(/* use default transition rule */)
  }

  /**
   * Compute neighbours of a cell.
   * Since the world in this example is limited, it is just
   * the hexagonal world provided by games-of-life package but
   * filtered by cells that are outside the viewport.
   */

  getNeighboursOf (coord) {
    const allNeighbours = gamesOfLife.space.hexagonal(coord)

    return allNeighbours.filter((coord) => (this.idOf(coord) !== null))
  }

  /**
   * This is not about Darwin theory, neither about Darwin kernel...
   */

  evolve () {
    const {
      alive,
      coordinate
    } = this.state

    const isAliveNow = (coord) => {
      const cellId = this.idOf(coord)
      return this.state.alive[cellId]
    }

    const isAliveNext = this.evolveRule(isAliveNow)

    let nextAlive = {}

    Object.keys(alive).forEach((id) => {
      nextAlive[id] = isAliveNext(coordinate[id])
    })

    this.setState({ alive: nextAlive })
  }

  /**
   * Returns the id of the cell, by its coordinates.
   *
   * @param {Array} coord
   * @returns {String} cellId
   */

  idOf (coord) {
    const coordinate = this.state.coordinate
    let cellId = null

    Object.keys(coordinate).forEach((id) => {
      if (cellId) return

      const xCoordAreEqual = (coord[0] === coordinate[id][0])
      const yCoordAreEqual = (coord[1] === coordinate[id][1])

      if (xCoordAreEqual && yCoordAreEqual) cellId = id
    })

    return cellId
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

World.defaultProps = {
  height: 300,
  isRunning: false,
  quantumTime: 1000,
  width: 400
}
