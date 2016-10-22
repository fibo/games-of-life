export const TOGGLE_CELL = 'TOGGLE_CELL'

export function toggleCell (id) {
  return {
    type: TOGGLE_CELL,
    id
  }
}
