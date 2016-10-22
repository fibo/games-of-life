import React, { PropTypes } from 'react'

const Hexagon = ({ alive, onClick, x, y }) => (
  <polygon
    onClick={onClick}
    fill={alive ? '#acb' : '#abc'}
    transform={`translate(${x * 70 + 35 * y}, ${y * 61 + 10})`}
    points='38.9068174 -5 71.8136348 13.9987599 71.8136348 51.9962797 38.9068174 70.9950396 6 51.9962797 6 13.9987599'
  />
)

Hexagon.propTypes = {
  alive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

Hexagon.defaultProps = {
  alive: true,
  onClick: Function.prototype,
  x: 0,
  y: 0
}

export default Hexagon
