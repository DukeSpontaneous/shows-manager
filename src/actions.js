import {
  SORTS as S,
  ACTIONS as A,
  API_KEYS as K
} from './constants'

const parseXPaginationHeaders = headers => ({
  page: parseInt(headers.get(`X-Pagination-Page`), 10),
  limit: parseInt(headers.get(`X-Pagination-Limit`), 10),
  pageCount: parseInt(headers.get(`X-Pagination-Page-Count`), 10),
  itemCount: parseInt(headers.get(`X-Pagination-Item-Count`), 10)
})

const onShowsSuccess = payload =>
  ({ type: A.FETCH_SHOWS_SUCCESS, payload })

const fetchShowsThenDispatch = (dispatch, url, init) => {
  let pageCount = 0

  dispatch({ type: A.FETCH_SHOWS_REQUEST })
  return fetch(url, init)
    .then(respond => {
      pageCount = parseXPaginationHeaders(respond.headers).pageCount
      return respond.json()
    })
    .then(page => onShowsSuccess({ page, pageCount }))
    .then(dispatch)
    .catch(error => console.error(error))
}

const traktInit = {
  method: `GET`,
  headers: new Headers({
    'Content-Type': `application/json`,
    'trakt-api-version': `2`,
    'trakt-api-key': K.TRAKT
  }),
}

export const getPage = (sort = S.WATCHED, page = 1, limit = 10) => dispatch => {
  const parameters = `extended=full&page=${page}&limit=${limit}`
  const url = `https://api.trakt.tv/shows/${sort}/all?${parameters}`
  return fetchShowsThenDispatch(
    dispatch,
    url,
    traktInit
  )
}


const onPosterSuccess = payload =>
  ({ type: A.FETCH_POSTER_SUCCESS, payload })

const fetchPosterThenDispatch = (dispatch, url, init) => {
  dispatch({ type: A.FETCH_POSTER_REQUEST })
  return fetch(url, init)
    .then(respond => respond.json())
    .then(payload => onPosterSuccess(payload))
    .then(dispatch)
    .catch(error => console.error(error))
}

export const getPoster = tvdb => dispatch => {
  const parameters = `api_key={${K.FANART}}`
  const url = `https://webservice.fanart.tv/v3/tv/${tvdb}?${parameters}`
  return fetchPosterThenDispatch(
    dispatch,
    url
  )
}
