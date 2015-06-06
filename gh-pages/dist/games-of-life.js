(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gamesOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var countAliveNeighbours = require('./countAliveNeighbours')

/**
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
 * @params {Number} a under population threshold
 * @params {Number} b over crowding threshold
 * @params {Number} c reproduction value
 * @params {Function} getNeighboursOf
 * @params {Function} isAlive
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

    if (isAlive(cell))
      return ((numNeighboursAlive >= a) && (numNeighboursAlive <= b))
    else
      return (numNeighboursAlive === c)
  }

  return nextStatusOf
}

module.exports = classicTransitionRule


},{"./countAliveNeighbours":2}],2:[function(require,module,exports){

/**
 * @params {Function} getNeighboursOf
 * @params {Function} isAlive
 * @params {*} cell
 * @returns {Number} count
 */

function countAliveNeighbours (getNeighboursOf, isAlive, cell) {
  return getNeighboursOf(cell).filter(isAlive).length
}

module.exports = countAliveNeighbours


},{}],3:[function(require,module,exports){

var classicTransitionRule = require('./classicTransitionRule')

/**
 * @params {Function} getNeighboursOf
 * @returns {Function} world
 */

function createWorld (getNeighboursOf) {

  /**
   * @params {Function} [transitionRule] defaults to classis GoL transition rule
   * @returns {Function} evolve
   */

  function world (transitionRule) {
    if (typeof transitionRule === 'undefined')
      transitionRule = classicTransitionRule.bind(null, 2, 3, 3)

    /**
     * @params {Function} isAliveNow
     * @returns {Function} isAliveNext
     */

    function evolve (isAliveNow) {
      var nextStatusOf = transitionRule(getNeighboursOf, isAliveNow)

      /**
       * @params {*} cell
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


},{"./classicTransitionRule":1}],4:[function(require,module,exports){

exports.classicTransitionRule = require('./classicTransitionRule')

exports.countAliveNeighbours = require('./countAliveNeighbours')

exports.createWorld = require('./createWorld')


},{"./classicTransitionRule":1,"./countAliveNeighbours":2,"./createWorld":3}],5:[function(require,module,exports){

module.exports = require('./src/')


},{"./src/":4}]},{},[5])(5)
});