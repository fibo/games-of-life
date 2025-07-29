import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { countAliveNeighbours } from 'games-of-life'

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

function getNeighboursOf (index) {
  return neighboursOf[index]
}

function emptyGrid (cell) {
  return false
}

function fullGrid (cell) {
  return true
}

function secondColumn (cell) {
  return (cell === 1) || (cell === 4) || (cell === 7)
}

function secondRow (cell) {
  return (cell === 3) || (cell === 4) || (cell === 5)
}

function cross (cell) {
  return secondRow(cell) || secondColumn(cell)
}

const countAliveNeighboursOfEmptyGrid = countAliveNeighbours.bind(null, getNeighboursOf, emptyGrid)
const countAliveNeighboursOfFullGrid = countAliveNeighbours.bind(null, getNeighboursOf, fullGrid)
const countAliveNeighboursOfSecondColumn = countAliveNeighbours.bind(null, getNeighboursOf, secondColumn)
const countAliveNeighboursOfSecondRow = countAliveNeighbours.bind(null, getNeighboursOf, secondRow)
const countAliveNeighboursOfCross = countAliveNeighbours.bind(null, getNeighboursOf, cross)

test('countAliveNeighbours', function () {

  [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ].forEach((count, index) =>
    assert.equal(countAliveNeighboursOfEmptyGrid(index), count));

  [
    3, 5, 3,
    5, 8, 5,
    3, 5, 3
  ].forEach((count, index) =>
    assert.equal(countAliveNeighboursOfFullGrid(index), count));

  [
    2, 1, 2,
    3, 2, 3,
    2, 1, 2
  ].forEach((count, index) =>
    assert.equal(countAliveNeighboursOfSecondColumn(index), count));

  [
    2, 3, 2,
    1, 2, 1,
    2, 3, 2
  ].forEach((count, index) =>
    assert.equal(countAliveNeighboursOfSecondRow(index), count));

  [
    3, 3, 3,
    3, 4, 3,
    3, 3, 3
  ].forEach((count, index) =>
    assert.equal(countAliveNeighboursOfCross(index), count));
})
