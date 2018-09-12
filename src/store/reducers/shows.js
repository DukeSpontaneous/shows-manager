import { ACTIONS as A } from '../../constants'

const initialShows = {
  fetchShows: {
    loading: false,
    success: false,
    failure: false
  },
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
        fetchShows: {
          loading: true,
          success: false,
          failure: false
        }
      }
    case A.FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        fetchShows: {
          loading: false,
          success: true,
          failure: false
        },
        ...payload
      }
    case A.FETCH_SHOWS_FAILURE:
      console.error(payload.error)
      return {
        ...state,
        fetchShows: {
          loading: false,
          success: false,
          failure: true
        },
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