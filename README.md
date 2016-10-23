# games-of-life

> is a Mathematical solution to any [Game of Life][1] variation

[Demo](#demo) |
[Installation](#installation) |
[Idea](#idea) |
[Example](#example) |
[See also](#see-also) |
[License](#license)

[![NPM version](https://badge.fury.io/js/games-of-life.svg)](http://badge.fury.io/js/games-of-life)
[![Badge size](https://badge-size.herokuapp.com/fibo/games-of-life/master/dist/games-of-life.min.js)](https://github.com/fibo/games-of-life/blob/master/dist/games-of-life.min.js)
[![Build Status](https://travis-ci.org/fibo/games-of-life.svg?branch=master)](https://travis-ci.org/fibo/games-of-life?branch=master)
[![Dependency Status](https://gemnasium.com/fibo/games-of-life.svg)](https://gemnasium.com/fibo/games-of-life)
[![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/games-of-life/changelog)

[![Whatchers](http://g14n.info/svg/github/watchers/games-of-life.svg)](https://github.com/fibo/games-of-life/watchers) [![Stargazers](http://g14n.info/svg/github/stars/games-of-life.svg)](https://github.com/fibo/games-of-life/stargazers) [![Forks](http://g14n.info/svg/github/forks/games-of-life.svg)](https://github.com/fibo/games-of-life/network/members)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![NPM](https://nodei.co/npm-dl/games-of-life.png)](https://nodei.co/npm-dl/games-of-life/)

## Demo

I created this hexagonal *Game of Life* demo to show that this package generalize
the *Game of Life* in any of its variations.
Click the image below to try it!

[![Hexagonal game of life](http://g14n.info/games-of-life/svg/HexagonalGameOfLife.svg)](http://g14n.info/games-of-life/demo/hexagonal)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install games-of-life
```

With [bower](http://bower.io/) do

```bash
bower install games-of-life
```

or use a CDN adding this to your HTML page

```
<script src="https://cdn.rawgit.com/fibo/games-of-life/master/dist/games-of-life.min.js"></script>
```

## Idea

On the 30th of May 2015, I have participated in a [Coderetreat at Milan XPUG](http://coderetreat.org/events/xpug-milan-coderetreat).

We have had so much fun coding implementations of the [Game of Life][1].

As a mathematician, I think it is a very interesting problem. I couldn't resist to generalize it and try to solve it in any of its variations.

Let's start with some abstractions.

A function *getNeighboursOf*, which returns the set of cells adjacent to a given cell, defines the shape of *Game of Life* universe.

Infact, since

    getNeighboursOf(cell1) = getNeightboursOf(cell2) ⇒ cell1 = cell2

it can be said that the set of neighbours of a cell is dual to the cell itself, hence the definition of the *getNeighboursOf* function is equivalent to the definition of the space of a *Game of Life* universe. Note that it defines the concept of **nearness**.

In other words,

> if you define a *getNeighbours* function you also shape the space of a *Game of Life* universe

On the other hand, let be given the definition of an *isAlive* function, which returns true if the given cell is alive, false otherwise.
It can be easily extended to an *areAlive* function which returns a list of booleans, given a list of cells and, following a similar identification we used for the *getNeighboursOf* function, an *isAlive* function describes the state of a *Game of Life* universe at a given moment.

The considerations above allow to implement an **abstract** *Game of Life* in a functional way, in any of its variations, for example:

* finite grid
* infinite grid
* 2-dimensional, 3-dimensional, n-dimensional
* square, triangular, hexagonal tiles
* cylinder, torus, moebius strip, boy surface

Take a look to [createWorld.js](https://github.com/fibo/games-of-life/blob/master/src/createWorld.js) for the implementation's details.

The world has a *transition rule* which defaults to the [classicTransitionRule.js](https://github.com/fibo/games-of-life/blob/master/src/classicTransitionRule.js).

## Example

A simple example is the [infinite grid with two dimensional coordinates](https://github.com/fibo/games-of-life/blob/master/test/example/infiniteGridWithTwoDimensionalCoordinates.js).

Define a *getNeighboursOf* which returns the neighbours of a given cell.

```javascript
function getNeighboursOf (cell) {
  var x = cell[0]
  var y = cell[1]

  var neighbours = []

  for (var j = y - 1; j <= y + 1; j++) {
    for (var i = x - 1; i <= x + 1; i++) {
      if ((i === x) && (j === y)) {
        continue
      }

      neighbours.push([i, j])
    }
  }

  return neighbours
}

// Alias the adjacency function  with a more meaningful name,
// to improve semantic in the example code below.
var infiniteGrid2d = getNeighboursOf
```

Create a *Game of Life* world, and get the *evolve* function

```javascript
var gamesOfLife = require('games-of-life')

var createWorld    = gamesOfLife.createWorld
var transitionRule = gamesOfLife.classicTransitionRule.bind(null, 2, 3, 3)

var world = createWorld(infiniteGrid2d)

var evolve = world(transitionRule)
```

The empty grid is represented by a function that always returns false, so

```javascript
function emptyGrid () {
  return false
}

evolve(emptyGrid) // will always return false
```

Try with a single cell at the origin

```javascript
function singleCellAtTheOrigin (cell) {
  return ((cell[0] === 0) && (cell[1] === 0))
}

evolve(singleCellAtTheOrigin) // will always return false too, cause the cell dies
```

Ok, a more interesting example is the blinker

![Blinker](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)

```javascript
function horyzontalBlinker (cell) {
  var x = cell[0]
  var y = cell[1]

  if (y !== 0) {
    return false
  }

  if ((x >= -1) && (x <= 1)) {
    return true
  }

  return false
}

function verticalBlinker (cell) {
  var x = cell[0]
  var y = cell[1]

  if (x !== 0) {
    return false
  }

  if ((y >= -1) && (y <= 1)) {
    return true
  }

  return false
}
```

You may check that the *verticalBlinker* evolves in the *horyzontalBlinker* and vice versa

```javascript
for (var i = -1; i < 1; i++) {
  for (var j = -1; j < 1; j++) {
    console.log(evolve(verticalBlinker)(i, j) ===  horyzontalBlinker(i, j)) // true
  }
}
```

## See also

External links:

* [LifeWiki][2]
* [Hacker News thread][3]

Other examples:

* [grid 3x3 as mono dimensional array](https://github.com/fibo/games-of-life/blob/master/test/example/grid3x3AsMonoDimensionalArray.js)
* [hexagonal tiles with two dimensional coordinates](https://github.com/fibo/games-of-life/blob/master/test/example/hexagonalTilesWithTwoDimensionalCoordinates.js)

## License

[MIT](http://g14n.info/mit-license)

[1]: http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life "Game of Life"
[2]: http://www.conwaylife.com/wiki/Main_Page "LikeWiki"
[3]: https://news.ycombinator.com/item?id=9632255 "Hacker News thread"

