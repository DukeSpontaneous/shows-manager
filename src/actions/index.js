import {
  ACTIONS as A
} from '../constants'

import { getPage } from './api/trakt'
import { getPoster } from './api/fanart'

export const loadPage = (sort, page, limit) => dispatch => {
  dispatch({ type: A.FETCH_SHOWS_REQUEST })
  return getPage(sort, page, limit)
    .then(payload => onShowsSuccess(payload))
    .then(dispatch)
    .catch(error => console.error(error))
}

const onShowsSuccess = payload =>
  ({
    type: A.FETCH_SHOWS_SUCCESS,
    payload
  })

export const loadPoster = tvdb => dispatch => {
  dispatch({ type: A.FETCH_POSTER_REQUEST })
  return getPoster(tvdb)
    .then(payload => onPosterSuccess(payload))
    .then(dispatch)
    .catch(error => console.error(error))
}

const onPosterSuccess = payload =>
  ({
    type: A.FETCH_POSTER_SUCCESS,
    payload
  })
