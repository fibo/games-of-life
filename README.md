# games-of-life

> A Mathematical solution to any Game of Life variation

[![NPM version](https://badge.fury.io/js/games-of-life.png)](http://badge.fury.io/js/games-of-life) [![Build Status](https://travis-ci.org/fibo/games-of-life.png?branch=master)](https://travis-ci.org/fibo/games-of-life?branch=master) [![Dependency Status](https://gemnasium.com/fibo/games-of-life.png)](https://gemnasium.com/fibo/games-of-life)

[![NPM](https://nodei.co/npm-dl/games-of-life.png)](https://nodei.co/npm-dl/games-of-life/)

## Idea

Today, the 30th of May 2015, I was at a [XPUG Milan Coderetreat](http://coderetreat.org/events/xpug-milan-coderetreat) that was very interesting.

We had fun coding implementations of the [Game of Life][1].

As a mathematician, I found it a very interesting problem and I could not resist to generalize it and try to solve it in any of its variations.

Let's start with some abstractions.

The definition of a function *getNeighboursOf* which returns the set of cells adjacent to a given cell, defines a universe of a *Game of Life*.

Infact, since

    getNeighboursOf(cell1) = getNeightboursOf(cell2) ⇒ cell1 = cell2

it can be said that the set of neighbours of a cell is dual to the cell itself, hence the definition of the *getNeighboursOf* function it is equivalent to the definition of the space of a *Game of Life* universe. Note that it defines the concept of **nearness**.

In other words,

> if you define a *getNeighbours* function you also shape the space of a *Game of Life* universe

The universe also has *rules*, which are not abstracted out in this study, but are generalized in their thresholds

1. Any live cell with fewer than `a` live neighbours dies, as if caused by under-population.
2. Any live cell with `a` or `b` live neighbours lives on to the next generation.
3. Any live cell with more than `b` live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly `c` live neighbours becomes a live cell, as if by reproduction.

where in the classic *Game of Life* rules,

    a = 2
    b = 3
    c = 3

On the other hand, let be given the definition of an *isAlive* function, which returns true if the given cell is alive, false otherwise.
It can be easily extended to an *areAlive* function which returns a list of booleans, given a list of cells and, following a similar identification we used for the *getNeighboursOf* function, an *isAlive* function describes the state of a *Game of Life* universe at a given moment.

The considerations above let implement an **abstract** *Game of Life* in a functional way, in any of its variations in the finite dimensional case, for example:

* finite grid
* infinite grid
* 2-dimensional, 3-dimensional, n-dimensional
* square, triangular, hexagonal tiles
* cylinder, torus, moebius strip, boy surface

Take a look to [gameOfLife.js](https://github.com/fibo/games-of-life/blob/master/src/gameOfLife.js) for the implementation details.

## Example

The simplest example is the [grid 3 x 3 implemented as a mono dimensional array](https://github.com/fibo/games-of-life/blob/master/test/grid3x3AsMonodimensionalArray.js).

```
0 1 2
3 4 5
6 7 8
```

Define a straight *getNeighboursOf* which returns the neighbours of a given cell, even without an algorithm. It doesn't matter since as two functions has the same result set they can be considered equivalents.

```
function getNeighboursOf (index) {
  var neighboursOf = {
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
```

Create the *evolve* function for this *Game of Life* universe

```
var gameOfLife = require('gameOfLife')

var evolve = gameOfLife(getNeighboursOf)
```

The empty grid is like a function that always returns false, so

```
function emptyGrid () { return false }

evolve(emptyGrid) // will always return false
```

Ok, a more interesting example is the blinker

![Blinker](http://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)

```
function horyzontalBlinker (cell) {
  return (cell === 3) || (cell === 4) || (cell === 5)
}

function verticalBlinker (cell) {
  return (cell === 1) || (cell === 4) || (cell === 7)
}

for (var i = 0; i < 9; i ++) {
  console.log(evolve(horyzontalBlinker)(i) === verticalBlinker(i)) // true
  console.log(evolve(verticalBlinker)(i) === horyzontalBlinker(i)) // true

  // and also
  console.log(evolve(evolve(horyzontalBlinker))(i) === horyzontalBlinker(i)) // true
  console.log(evolve(evolve(verticalBlinker))(i) === verticalBlinker(i)) // true
}
```

## Links

[LifeWiki][2]
[Hacker News thread][3]

## License

[MIT](http://g14n.info/mit-license)

[1]: http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life "Game of Life"
[2]: http://www.conwaylife.com/wiki/Main_Page "LikeWiki"
[3]: https://news.ycombinator.com/item?id=9632255 "Hacker News thread"
 
