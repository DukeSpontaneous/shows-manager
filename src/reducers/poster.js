import A from '../constants/ActionTypes'

const initialState = {
  inProgress: false,
  url: ``
}

const poster = (state = initialState, { type, payload } = { type: null }) => {
  switch (type) {
    case A.FETCH_POSTER_REQUEST:
      return {
        ...state,
        inProgress: true
      }
    case A.FETCH_POSTER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        ...payload
      }
    case A.FETCH_POSTER_FAILURE:
      console.error(payload.error)
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default poster