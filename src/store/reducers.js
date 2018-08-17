import { ACTIONS as A } from '../constants'

export const shows = (state = [], action = { type: null }) => {
  console.log(`shows-reducer action: ${action.type}`)
  switch (action.type) {
    case A.SWOWS_LOADED:
      return action.data
    default:      
      return state
  }
}