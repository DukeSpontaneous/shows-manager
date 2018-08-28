import { combineReducers } from 'redux'
import { ACTIONS as A } from '../constants'

const initialShows = {
  showsRequestInProgress: false,
  fetchShowsSuccess: false,
  fetchShowsFailure: false,
  page: [],
  pageCount: 0
}

const shows = (state = initialShows, { type, payload } = { type: null }) => {
  switch (type) {
    case A.FETCH_SHOWS_REQUEST:
      return {
        ...state,
        showsRequestInProgress: true,
        fetchShowsSuccess: false,
        fetchShowsFailure: false
      }
    case A.FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        showsRequestInProgress: false,
        fetchShowsSuccess: true,
        fetchShowsFailure: false,
        page: payload.page,
        pageCount: payload.pageCount
      }
    case A.FETCH_SHOWS_FAILURE:
      return {
        ...state,
        showsRequestInProgress: false,
        fetchShowsSuccess: false,
        fetchShowsFailure: true,
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
