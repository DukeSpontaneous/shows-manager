import { ACTIONS as A } from '../../constants'

const initialPoster = {
  inProgress: false,
  url: ``
}

const poster = (state = initialPoster, { type, payload } = { type: null }) => {
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
        ...state,
        inProgress: false,
        url: ``
      }
    default:
      return state
  }
}

export default poster