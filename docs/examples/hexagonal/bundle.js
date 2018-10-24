(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Root = require('./components/Root')
const reducer = require('./reducer')

/**
 * App loader.
 *
 * window.addEventListener('load', app(state))
 */

function app (initialState) {
  return function () {
    let currentState = initialState

    let render = Function.prototype

    function dispatch (action) {
      currentState = reducer(currentState, action)

      render(currentState)
    }

    const root = new Root(dispatch, document.body)

    render = root.render.bind(root)

    dispatch({ type: 'INIT' })
  }
}

module.exports = app

},{"./components/Root":6,"./reducer":11}],2:[function(require,module,exports){
class Component {
  constructor (dispatch, element) {
    this.dispatch = dispatch
    this.element = element

    this.component = {}
  }

  createElement (qualifiedName) {
    const element = document.createElement(qualifiedName)

    this.element.appendChild(element)

    return element
  }

  createElementNS (qualifiedName) {
    const namespaceURI = 'http://www.w3.org/2000/svg'

    const element = document.createElementNS(namespaceURI, qualifiedName)

    this.element.appendChild(element)

    return element
  }

  render (state) {
    var component = this.component

    Object.keys(component).forEach(function (key) {
      component[key].render(state)
    })
  }
}

module.exports = Component

},{}],3:[function(require,module,exports){
const Component = require('./Component')

const PlayButton = require('./PlayButton')

class Footer extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.playButton = new PlayButton(dispatch, document.querySelector('.PlayButton'))
  }
}

module.exports = Footer

},{"./Component":2,"./PlayButton":5}],4:[function(require,module,exports){
const Component = require('./Component')

class Hexagon extends Component {
  constructor (dispatch, element, coordinates) {
    super(dispatch, element)

    this.coordinates = coordinates

    this.element.setAttribute('class', 'Hexagon')

    this.element.onclick = this.onclick.bind(this)
  }

  onclick () {
    const {
      coordinates,
      dispatch
    } = this

    dispatch({
      type: 'TOGGLE_CELL',
      coordinates
    })
  }

  render (state) {
    const {
      coordinates,
      element
    } = this

    const [i, j] = coordinates

    const myState = state.cells[i][j]

    const { alive } = myState

    if (state.unit !== this.unit) {
      const unit = this.unit = state.unit

      const rad60 = 2 * Math.PI / 6
      const cos60 = Math.cos(rad60)
      const sin60 = Math.sin(rad60)

      const A = { x: unit, y: 0 }
      const B = { x: cos60 * unit, y: sin60 * unit }
      const C = { x: -cos60 * unit, y: sin60 * unit }
      const D = { x: -unit, y: 0 }
      const E = { x: -cos60 * unit, y: -sin60 * unit }
      const F = { x: cos60 * unit, y: -sin60 * unit }

      const points = `${A.x} ${A.y} ${B.x} ${B.y} ${C.x} ${C.y} ${D.x} ${D.y} ${E.x} ${E.y} ${F.x} ${F.y}`

      this.element.setAttributeNS(null, 'points', points)

      const transform = `translate(${j * unit * 1.6},${i * unit * 1.8 + j * unit * sin60 - window.screen.height})`

      this.element.setAttributeNS(null, 'transform', transform)
    }

    if (alive !== this.alive) {
      if (alive) {
        element.classList.add('alive')
      } else {
        element.classList.remove('alive')
      }

      this.alive = alive
    }
  }
}

module.exports = Hexagon

},{"./Component":2}],5:[function(require,module,exports){
const SvgIcon = require('./SvgIcon')

const playShape = 'M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'
const stopShape = 'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z'

class PlayButton extends SvgIcon {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.element.onclick = this.onclick.bind(this)
  }

  onclick () {
    this.dispatch({
      type: this.play ? 'STOP' : 'PLAY'
    })
  }

  render (state) {
    if (this.play !== state.play) {
      if (state.play) {
        this.path.setAttributeNS(null, 'd', stopShape)
      } else {
        this.path.setAttributeNS(null, 'd', playShape)
      }

      this.play = state.play
    }
  }
}

module.exports = PlayButton

},{"./SvgIcon":7}],6:[function(require,module,exports){
const Component = require('./Component')

const Footer = require('./Footer')
const World = require('./World')

class Root extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.component.footer = new Footer(dispatch, document.querySelector('footer'))

    this.component.world = new World(dispatch, document.querySelector('svg.World'))

    window.addEventListener('resize', () => {
      dispatch({ type: 'RESIZE' })
    })
  }
}

module.exports = Root

},{"./Component":2,"./Footer":3,"./World":8}],7:[function(require,module,exports){
const Component = require('./Component')

class SvgIcon extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    // This app uses Font Awesome icons which have all the following viewBox.
    element.setAttributeNS(null, 'viewBox', '0 0 448 512')

    this.path = this.createElementNS('path')
  }
}

module.exports = SvgIcon

},{"./Component":2}],8:[function(require,module,exports){
const Component = require('./Component')

const Hexagon = require('./Hexagon')

const screenHeight = window.screen.height
const screenWidth = window.screen.width

class World extends Component {
  constructor (dispatch, element) {
    super(dispatch, element)

    this.cells = [[]]
  }

  createCell (coordinates) {
    const polygon = this.createElementNS('polygon')

    return new Hexagon(this.dispatch, polygon, coordinates)
  }

  render (state) {
    const {
      dispatch
    } = this

    const numRows = state.cells.length
    const numCols = numRows > 0 ? state.cells[0].length : 0

    while (this.cells.length < numRows) {
      this.cells.push([])
    }

    state.cells.forEach((row, i, rows) => {
      row.forEach((cell, j, cells) => {
        if (typeof this.cells[i][j] === 'undefined') {
          this.cells[i][j] = this.createCell([i, j])
        }

        this.cells[i][j].render(state)
      })
    })

    const currentHeight = numRows * state.unit * 2 * Math.sin(Math.PI / 3)
    const currentWidth = numCols * state.unit * 1.5

    // Fill space with cells, use setTimeout just to animate.

    if (currentHeight < screenHeight * 2) {
      setTimeout(() => {
        dispatch({ type: 'ADD_ROW' })
      }, 10)

      return
    } else if (currentWidth < screenWidth) {
      setTimeout(() => {
        dispatch({ type: 'ADD_COLUMN' })
      }, 17)

      return
    }

    // Note that *quantumTime* must be checked before *play*.
    if (state.quantumTime !== this.quantumTime) {
      this.quantumTime = state.quantumTime
    }

    if (state.play !== this.play) {
      if (state.play) {
        this.startGame()
      } else {
        this.stopGame()
      }

      this.play = state.play
    }
  }

  startGame () {
    this.loop = setInterval(() => {
      this.dispatch({ type: 'EVOLVE' })
    }, this.quantumTime)
  }

  stopGame () {
    clearInterval(this.loop)
  }
}

module.exports = World

},{"./Component":2,"./Hexagon":4}],9:[function(require,module,exports){
const app = require('./app')

const initialState = require('./initialState')

window.addEventListener('load', app(initialState))

},{"./app":1,"./initialState":10}],10:[function(require,module,exports){
const initialState = {
  cells: [],
  play: false,
  quantumTime: 400,
  unit: 17
}

module.exports = initialState

},{}],11:[function(require,module,exports){
const gamesOfLife = require('games-of-life')

const evolveRule = gamesOfLife.createWorld(
  gamesOfLife.space.hexagonal
)(
  gamesOfLife.classicTransitionRule.bind(null, 1, 2, 3)
)

function reducer (currenState, action) {
  const state = Object.assign({}, currenState)

  switch (action.type) {
    case 'ADD_COLUMN': // Add a column, i.e. a cell to every row.
      for (let i in state.cells) {
        state.cells[i].push({
          alive: Math.random() > 0.71
        })
      }

      return state

    case 'ADD_ROW': // Add a row with one cell.
      state.cells.push([
        {
          alive: Math.random() < 0.17
        }
      ])

      return state

    case 'EVOLVE':
      const isAliveNow = (coord) => {
        const [i, j] = coord

        if (typeof currenState.cells[i] === 'undefined') {
          return false
        } else {
          if (typeof currenState.cells[i][j] === 'undefined') {
            return false
          } else {
            return currenState.cells[i][j].alive
          }
        }
      }

      const isAliveNext = evolveRule(isAliveNow)

      state.cells.forEach((row, i) => {
        row.forEach((cell, j) => {
          state.cells[i][j].alive = isAliveNext([i, j])
        })
      })

      return state

    case 'PLAY':
      state.play = true

      return state

    case 'RESIZE':
      // This is handled by World component, no need to modify state.
      // This event is dispatched just to trigger a render cycle.

      return state

    case 'STOP':
      state.play = false

      return state

    case 'TOGGLE_CELL':
      const [i, j] = action.coordinates

      state.cells[i][j].alive = !state.cells[i][j].alive

      return state

    default: return state
  }
}

module.exports = reducer

},{"games-of-life":15}],12:[function(require,module,exports){
var countAliveNeighbours = require('./countAliveNeighbours')

/**
 * Implements the followinf rules.
 *
 * 1. Any live cell with fewer than `a` live neighbours dies, as if caused by under-population.
 * 2. Any live cell with `a` or `b` live neighbours lives on to the next generation.
 * 3. Any live cell with more than `b` live neighbours dies, as if by overcrowding.
 * 4. Any dead cell with exactly `c` live neighbours becomes a live cell, as if by reproduction.
 *
 * where in the classic *Game of Life*,
 *
 * ```
 * a = 2
 * b = 3
 * c = 3
 * ```
 *
 * @param {Number} a under population threshold
 * @param {Number} b over crowding threshold
 * @param {Number} c reproduction value
 * @param {Function} getNeighboursOf
 * @param {Function} isAlive
 *
 * @returns {Function} nextStatusOf (cell)
 */

function classicTransitionRule (a, b, c, getNeighboursOf, isAlive) {
  var countAliveNeighboursOf = countAliveNeighbours.bind(null, getNeighboursOf, isAlive)

  /**
   * @param {*} cell
   * @returns {Boolean} status
   */

  function nextStatusOf (cell) {
    var numNeighboursAlive = countAliveNeighboursOf(cell)

    if (isAlive(cell)) {
      return ((numNeighboursAlive >= a) && (numNeighboursAlive <= b))
    } else {
      return (numNeighboursAlive === c)
    }
  }

  return nextStatusOf
}

module.exports = classicTransitionRule

},{"./countAliveNeighbours":13}],13:[function(require,module,exports){
/**
 * Counts alive cells nearby.
 *
 * @param {Function} getNeighboursOf
 * @param {Function} isAlive
 * @param {*} cell
 * @returns {Number} count
 */

function countAliveNeighbours (getNeighboursOf, isAlive, cell) {
  return getNeighboursOf(cell).filter(isAlive).length
}

module.exports = countAliveNeighbours

},{}],14:[function(require,module,exports){
var classicTransitionRule = require('./classicTransitionRule')

/**
 * Create a GoL world.
 *
 * @param {Function} getNeighboursOf
 * @returns {Function} world
 */

function createWorld (getNeighboursOf) {
  /**
   * @param {Function} [transitionRule] defaults to classis GoL transition rule
   * @returns {Function} evolve
   */

  function world (transitionRule) {
    if (typeof transitionRule === 'undefined') {
      transitionRule = classicTransitionRule.bind(null, 2, 3, 3)
    }

    /**
     * @param {Function} isAliveNow
     * @returns {Function} isAliveNext
     */

    function evolve (isAliveNow) {
      var nextStatusOf = transitionRule(getNeighboursOf, isAliveNow)

      /**
       * @param {*} cell
       * @returns {Boolean} status of the cell
       */

      function isAliveNext (cell) {
        return nextStatusOf(cell)
      }

      return isAliveNext
    }

    return evolve
  }

  return world
}

module.exports = createWorld

},{"./classicTransitionRule":12}],15:[function(require,module,exports){
exports.classicTransitionRule = require('./classicTransitionRule')

exports.countAliveNeighbours = require('./countAliveNeighbours')

exports.createWorld = require('./createWorld')

exports.pattern = require('./pattern')

exports.space = require('./space')

},{"./classicTransitionRule":12,"./countAliveNeighbours":13,"./createWorld":14,"./pattern":17,"./space":21}],16:[function(require,module,exports){
/**
 * Emptyness.
 *
 * @returns {Boolean} false
 */

function emptySpace () {
  return false
}

module.exports = emptySpace

},{}],17:[function(require,module,exports){
exports.emptySpace = require('./emptySpace')

exports.singleCell = require('./singleCell')

exports.singleCellAtOrigin = require('./singleCellAtOrigin')

},{"./emptySpace":16,"./singleCell":18,"./singleCellAtOrigin":19}],18:[function(require,module,exports){
var singleCellAtOrigin = require('./singleCellAtOrigin')

/**
 * @param {Array} coordinates of cell
 * @returns {Function} isAlive
 */

function singleCell (coordinates) {
  return function isAlive (cell) {
    var translatedCell = []

    for (var i in cell) translatedCell.push(cell[i] - coordinates[i])

    return singleCellAtOrigin(translatedCell)
  }
}

module.exports = singleCell

},{"./singleCellAtOrigin":19}],19:[function(require,module,exports){
/**
 * A cell with all zero coordinates.
 *
 * @param {Array} cell
 * @returns {Boolean} status
 */

function singleCellAtOrigin (cell) {
  function isZero (coordinate) {
    return coordinate === 0
  }

  return cell.filter(isZero).length === cell.length
}

module.exports = singleCellAtOrigin

},{}],20:[function(require,module,exports){
/**
 * Defines an hexagonal tiling with well defined 2d coordinates
 *
 * The natural mathematics to describe an hexagonal tiling is given by [Eisenstein integers](http://en.wikipedia.org/wiki/Eisenstein_integer).
 *
 * The cube root of unit ω is given by
 *
 * ![omega coordinates](http://upload.wikimedia.org/math/0/e/3/0e396c16b84893b618487309549952fe.png)
 *
 * My first idea was to use a sort of three dimensional coordinates
 *
 * ```
 * x = 2 + ω
 * y = 1 + 2 ω
 * z = ω - 1
 * ```
 *
 * ```
 *                 Y axis
 *                                               X axis
 *                 0,1,1                  3,0,0
 *  Z axis
 *
 *    0,0,2        0,1,0           2,0,0
 *
 *          0,0,1         1,0,0
 *
 *     o           0,0,0             o
 *
 *         -1,0,0          0,0,-1            o
 *
 *                0,-1,0           0,0,-2
 *
 *            o              o
 *
 *                0,-2,0
 * ```
 *
 * then, applying condition `y = z + x` everything makes sense.
 * Yes, cause it is like a plane in 3d so coordinates reduces to two and furthermore, it is geometrically well defined, i.e. it makes coordinates linear.
 *
 *
 * ```
 *                 1, 1
 *
 *          0, 1          2, 0
 *
 *   -1, 1         1, 0          1, 1
 *
 *          0, 0          2,-1
 *
 *   -1, 0         1,-1
 *
 *          0,-1
 * ```
 *
 * @param {Array} cell
 * @returns {Array} neighbours
 */

function hexagonal (cell) {
  var x = cell[0]
  var y = cell[1]

  var neighbours = [
    [x - 1, y + 1], [x, y + 1], [x + 1, y],
    [x - 1, y], [x, y - 1], [x + 1, y - 1]
  ]

  return neighbours
}

module.exports = hexagonal

},{}],21:[function(require,module,exports){
exports.hexagonal = require('./hexagonal')

},{"./hexagonal":20}]},{},[9]);
