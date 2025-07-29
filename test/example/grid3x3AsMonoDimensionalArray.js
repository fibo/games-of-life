import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { createWorld, classicTransitionRule } from 'games-of-life'

const transitionRule = classicTransitionRule.bind(null, 2, 3, 3)

/**
 * Represents a 3x3 grid as a mono-dimensional array.
 *
 * @params {Number} cell represented by an array index
 * @returns {Array} neighboursOf
 */

function getNeighboursOf3x3Grid (index) {
  const neighboursOf = {
    0: [1, 3, 4],
    1: [0, 2, 3, 4, 5],
    2: [1, 4, 5],
    3: [0, 1, 4, 6, 7],
    4: [0, 1, 2, 3, 5, 6, 7, 8],
    5: [1, 2, 4, 7, 8],
    6: [3, 4, 7],
    7: [3, 4, 5, 6, 8],
    8: [4, 5, 7]
  }

  return neighboursOf[index]
}

const world = createWorld(getNeighboursOf3x3Grid)

const evolve = world(transitionRule)

function pattern0 () {
  return false
}

function pattern1 () {
  return cell === 0
}

function horyzontalBlinker (cell) {
  return (cell === 3) || (cell === 4) || (cell === 5)
}

function verticalBlinker (cell) {
  return (cell === 1) || (cell === 4) || (cell === 7)
}

function patternsAreEqual (patternA, patternB) {
  let areEqual = true

  for (var i = 0; i < 9; i++) {
    if (patternA(i) !== patternB(i)) {
      areEqual = false
      break
    }
  }

  return areEqual
}

test('grid3x3AsMonoDimensionalArray', () => {
  assert.ok(patternsAreEqual(evolve(pattern1), pattern0))
  assert.ok(patternsAreEqual(evolve(verticalBlinker), horyzontalBlinker))
  assert.ok(patternsAreEqual(evolve(horyzontalBlinker), verticalBlinker))
})
