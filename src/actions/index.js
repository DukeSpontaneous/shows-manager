import {
  ACTIONS as A
} from '../constants'

import { getPage, searchShows } from './api/trakt'
import { getPoster } from './api/fanart'

const createAction = (type, payload) => ({ type, payload })

export const loadSortedPage = (sort, page, limit) => dispatch => {
  dispatch(createAction(A.FETCH_SHOWS_REQUEST))
  return getPage(sort, page, limit)
    .then(payload => createAction(A.FETCH_SHOWS_SUCCESS, payload))
    .catch(error => createAction(A.FETCH_SHOWS_FAILURE, { error }))
    .then(dispatch)
}

export const loadQueryPage = (query, page, limit) => dispatch => {
  dispatch(createAction(A.FETCH_SHOWS_REQUEST))
  return searchShows(query, page, limit)
    .then(payload => createAction(A.FETCH_SHOWS_SUCCESS, payload))
    .catch(error => createAction(A.FETCH_SHOWS_FAILURE, { error }))
    .then(dispatch)
}

export const loadPoster = tvdb => dispatch => {
  dispatch(createAction(A.FETCH_POSTER_REQUEST))
  return getPoster(tvdb)
    .then(payload => createAction(A.FETCH_POSTER_SUCCESS, payload))
    .catch(error => createAction(A.FETCH_POSTER_FAILURE, { error }))
    .then(dispatch)
}