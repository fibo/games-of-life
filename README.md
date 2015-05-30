# games-of-life

> A Mathematical solution to any Game of Life variation

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


[1]: http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life "Game of Life"