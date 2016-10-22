import React, { PropTypes, Component } from 'react'
import Hexagon from './Hexagon'
import { toggleCell } from '../actions'

class World extends Component {
  render () {
    const {
      alive,
      coordinate,
      dispatch,
      height,
      isRunning,
      width
    } = this.props

    return (
      <svg height={height} width={width}>
        {Object.keys(coordinate).map((id, i) => {
          const coord = coordinate[id]

          return (
            <Hexagon
              key={i}
              onClick={isRunning ? undefined : (
                () => { dispatch(toggleCell(id)) }
              )}
              alive={alive[id]}
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
  width: 400,
  height: 300
}

export default World
