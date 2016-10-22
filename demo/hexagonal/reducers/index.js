import {
  TOGGLE_CELL
} from '../actions'

export default function (state, action) {
  const current = Object.assign({}, state)

  const id = action.id

  switch (action.type) {
    case TOGGLE_CELL:
      current.alive[id] = !current.alive[id]
      return current

    default:
      return current
  }
}
