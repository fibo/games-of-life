import { NEXT_ITERATION, TOGGLE_CELL } from '../actions'

const initialState = {

}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEXT_ITERATION:
      return state
    case TOGGLE_CELL:
      return state
    default:
      return state
  }
}
