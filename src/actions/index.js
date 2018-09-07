import {
  ACTIONS as A
} from '../constants'

import { getPage } from './api/trakt'
import { getPoster } from './api/fanart'

const createAction = (type, payload) => ({ type, payload })

export const loadPage = (sort, page, limit) => dispatch => {
  dispatch(createAction(A.FETCH_SHOWS_REQUEST))
  return getPage(sort, page, limit)
    .then(payload => createAction(A.FETCH_SHOWS_SUCCESS, payload))
    .then(dispatch)
    .catch(error => dispatch(
      createAction(A.FETCH_SHOWS_FAILURE, { error })
    ))
}

export const loadPoster = tvdb => dispatch => {
  dispatch(createAction(A.FETCH_POSTER_REQUEST))
  return getPoster(tvdb)
    .then(payload => createAction(A.FETCH_POSTER_SUCCESS, payload))
    .then(dispatch)
    .catch(error => dispatch(
      createAction(A.FETCH_POSTER_FAILURE, { error })
    ))
}