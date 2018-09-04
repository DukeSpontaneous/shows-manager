import { combineReducers } from 'redux'
import { ACTIONS as A } from '../constants'

const initialShows = {
  fetchShows: {
    loading: false,
    success: false,
    failure: false
  },
  page: [],
  pageCount: 0
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
        page: payload.page,
        pageCount: payload.pageCount
      }
    case A.FETCH_SHOWS_FAILURE:
      return {
        ...state,
        fetchShows: {
          loading: false,
          success: false,
          failure: true
        },
        page: [],
        pageCount: 0
      }
    default:
      return state
  }
}

export default combineReducers({
  shows
})
