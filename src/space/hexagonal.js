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
