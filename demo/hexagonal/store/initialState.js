export const isRunning = false

const bigHexagon = {
  c04: [0, 4],
  c05: [0, 5],
  c06: [0, 6],
  c07: [0, 7],
  c08: [0, 8],
  c13: [1, 3],
  c14: [1, 4],
  c15: [1, 5],
  c16: [1, 6],
  c17: [1, 7],
  c18: [1, 8],
  c22: [2, 2],
  c23: [2, 3],
  c24: [2, 4],
  c25: [2, 5],
  c26: [2, 6],
  c27: [2, 7],
  c28: [2, 8],
  c31: [3, 1],
  c32: [3, 2],
  c33: [3, 3],
  c34: [3, 4],
  c35: [3, 5],
  c36: [3, 6],
  c37: [3, 7],
  c38: [3, 8],
  c40: [4, 0],
  c41: [4, 1],
  c42: [4, 2],
  c43: [4, 3],
  c44: [4, 4],
  c45: [4, 5],
  c46: [4, 6],
  c47: [4, 7],
  c48: [4, 8],
  c50: [5, 0],
  c51: [5, 1],
  c52: [5, 2],
  c53: [5, 3],
  c54: [5, 4],
  c55: [5, 5],
  c56: [5, 6],
  c57: [5, 7],
  c60: [6, 0],
  c61: [6, 1],
  c62: [6, 2],
  c63: [6, 3],
  c64: [6, 4],
  c65: [6, 5],
  c66: [6, 6],
  c70: [7, 0],
  c71: [7, 1],
  c72: [7, 2],
  c73: [7, 3],
  c74: [7, 4],
  c75: [7, 5],
  c80: [8, 0],
  c81: [8, 1],
  c82: [8, 2],
  c83: [8, 3],
  c84: [8, 4]
}

// Cells above form is a 5 side hexagon, translate it.
export const coordinate = (() => {
  var translated = {}

  Object.keys(bigHexagon).forEach((id) => {
    const coord = bigHexagon[id]
    translated[id] = [coord[0] - 2, coord[1]]
  })

  return translated
})()

// Genereate a random initial state.
export const alive = (() => {
  var randomPattern = {}

  Object.keys(coordinate).forEach((id) => {
    randomPattern[id] = Math.random() < 0.4
  })

  return randomPattern
})()
