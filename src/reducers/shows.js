import A from '../constants/ActionTypes'

const initialState = {
  inProgress: false,
  list: [],
  headers: { pageCount: 0 },
  category: ``,
  ptr: ``
}

const shows = (state = initialState, { type, payload } = { type: null }) => {
  switch (type) {
    case A.FETCH_SHOWS_REQUEST:
      return {
        ...state,
        inProgress: true,
      }
    case A.FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        ...payload
      }
    case A.FETCH_SHOWS_FAILURE:
      console.error(payload.error)
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default shows