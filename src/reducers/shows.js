import A from '../constants/ActionTypes'

const initialShows = {
  inProgress: false,
  list: [],
  headers: { pageCount: 0 },
  category: ``,
  ptr: ``
}

const shows = (state = initialShows, { type, payload } = { type: null }) => {
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
        ...state,
        inProgress: false,
        list: [],
        headers: {},
        category: ``,
        ptr: ``
      }
    default:
      return state
  }
}

export default shows