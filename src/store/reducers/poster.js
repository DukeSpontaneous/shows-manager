import { ACTIONS as A } from '../../constants'

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
        ...payload
      }
    case A.FETCH_POSTER_FAILURE:
      console.error(payload.error)
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

export default poster