import A from '../constants/ActionTypes'

import * as traktTv from './api/trakt'
import * as fanartTv from './api/fanart'

const startShowsLoading = () =>
  ({ type: A.FETCH_SHOWS_REQUEST })

const successShowsLoading = payload =>
  ({ type: A.FETCH_SHOWS_SUCCESS, payload })

const failureShowsLoading = error =>
  ({ type: A.FETCH_SHOWS_FAILURE, payload: { error } })

export const loadSortedPage = (sort, page, limit) => dispatch => {
  dispatch(startShowsLoading())
  return traktTv.getPage(sort, page, limit)
    .then(payload => successShowsLoading(payload))
    .catch(error => failureShowsLoading(error))
    .then(dispatch)
}

export const loadQueryPage = (query, page, limit) => dispatch => {
  dispatch(startShowsLoading())
  return traktTv.searchShows(query, page, limit)
    .then(payload => successShowsLoading(payload))
    .catch(error => failureShowsLoading(error))
    .then(dispatch)
}

const startPosterLoading = () =>
  ({ type: A.FETCH_POSTER_REQUEST })

const successPosterLoading = payload =>
  ({ type: A.FETCH_POSTER_SUCCESS, payload })

const failurePosterLoading = error =>
  ({ type: A.FETCH_POSTER_FAILURE, payload: { error } })

export const loadPoster = tvdb => dispatch => {
  dispatch(startPosterLoading())
  return fanartTv.getPoster(tvdb)
    .then(payload => successPosterLoading(payload))
    .catch(error => failurePosterLoading(error))
    .then(dispatch)
}