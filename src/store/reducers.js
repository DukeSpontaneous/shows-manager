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

const initialPoster = {
  fetchPoster: {
    loading: false,
    success: false,
    failure: false
  },
  url: ``
}

const poster = (state = initialPoster, { type, payload } = { type: null }) => {
  switch (type) {
    case A.FETCH_POSTER_REQUEST:
      return {
        ...state,
        fetchPoster: {
          loading: true,
          success: false,
          failure: false
        },
      }
    case A.FETCH_POSTER_SUCCESS:
      return {
        ...state,
        fetchPoster: {
          loading: false,
          success: true,
          failure: false
        },
        url: payload.tvposter.length > 0 ? payload.tvposter[0].url : ``
      }
    case A.FETCH_POSTER_FAILURE:
      return {
        ...state,
        fetchPoster: {
          loading: false,
          success: false,
          failure: true
        },
        url: ``
      }
    default:
      return state
  }
}

export default combineReducers({
  shows,
  poster
})
