import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { createWorld, classicTransitionRule } from 'games-of-life'

const transitionRule = classicTransitionRule.bind(null, 2, 3, 3)

/**
 * @params {Array} cell
 * @returns {Array} neighbours
 */

function getNeighboursOfInfiniteGrid (cell) {
  const x = cell[0]
  const y = cell[1]

  const neighbours = []

  for (let j = y - 1; j <= y + 1; j++) {
    for (let i = x - 1; i <= x + 1; i++) {
      if ((i === x) && (j === y)) {
        continue
      }

      neighbours.push([i, j])
    }
  }

  return neighbours
}

const world = createWorld(getNeighboursOfInfiniteGrid)

const evolve = world(transitionRule)

test('getNeighboursOfInfiniteGrid', () => {
  const neighbours = getNeighboursOfInfiniteGrid([2, 3])

  assert.deepEqual(neighbours, [
    [1, 2], [2, 2], [3, 2],
    [1, 3], /* o */ [3, 3],
    [1, 4], [2, 4], [3, 4]
  ])
})

function patternsAreEqual (patternA, patternB) {
  let areEqual = true

  for (let i = -20; i < 20; i++) {
    for (let j = -20; j < 20; j++) {
      if (patternA(i, j) !== patternB(i, j)) {
        areEqual = false
        break
      }
    }
  }

  return areEqual
}

function emptyGrid () {
  return false
}

function singleCellAtTheOrigin (cell) {
  return ((cell[0] === 0) && (cell[1] === 0))
}

function horyzontalBlinker (cell) {
  const x = cell[0]
  const y = cell[1]

  if (y !== 0) {
    return false
  }

  if ((x >= -1) && (x <= 1)) {
    return true
  }

  return false
}

function verticalBlinker (cell) {
  const x = cell[0]
  const y = cell[1]

  if (x !== 0) {
    return false
  }

  if ((y >= -1) && (y <= 1)) {
    return true
  }

  return false
}

test('infiniteGridWithTwoDimensionalCoordinates', () => {
  assert.ok(patternsAreEqual(evolve(emptyGrid), emptyGrid))
  assert.ok(patternsAreEqual(evolve(singleCellAtTheOrigin), emptyGrid))
  assert.ok(patternsAreEqual(evolve(verticalBlinker), horyzontalBlinker))
  assert.ok(patternsAreEqual(evolve(horyzontalBlinker), verticalBlinker))
  assert.ok(patternsAreEqual(evolve(evolve(horyzontalBlinker)), horyzontalBlinker))
})
