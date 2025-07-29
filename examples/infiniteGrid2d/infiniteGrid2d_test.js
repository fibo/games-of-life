import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { createWorld, classicTransitionRule } from 'games-of-life'

const transitionRule = classicTransitionRule.bind(null, 2, 3, 3)

/**
 * @params {Array} cell
 * @returns {Array} neighbours
 */

function infiniteGrid2d ([x, y]) {
  const neighbours = []

  for (let j = y - 1; j <= y + 1; j++) {
    for (let i = x - 1; i <= x + 1; i++) {
      if ((i === x) && (j === y))
        continue

      neighbours.push([i, j])
    }
  }

  return neighbours
}

const world = createWorld(infiniteGrid2d)

const evolve = world(transitionRule)

test('infiniteGrid2d', () => {
  const neighbours = infiniteGrid2d([2, 3])

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
      if (patternA([i, j]) !== patternB([i, j])) {
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

function horizontalBlinker ([x, y]) {
  if (y !== 0) {
    return false
  }

  if ((x >= -1) && (x <= 1)) {
    return true
  }

  return false
}

// Blinker translated with x --> x + 2
function verticalBlinker ([x, y]) {
  if (x !== 0) {
    return false
  }

  if ((y >= -1) && (y <= 1)) {
    return true
  }

  return false
}

test('infiniteGrid2d evolution', () => {
  assert.ok(patternsAreEqual(evolve(emptyGrid), emptyGrid))
  assert.ok(patternsAreEqual(evolve(singleCellAtTheOrigin), emptyGrid))
  assert.ok(patternsAreEqual(evolve(verticalBlinker), horizontalBlinker))
  assert.ok(patternsAreEqual(evolve(horizontalBlinker), verticalBlinker))
})
