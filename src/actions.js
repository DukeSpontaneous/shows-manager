import {
  SORTS as S,
  ACTIONS as A
} from './constants'

const myInit = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': 'a7970fc9095e0bca9dc85a9255bc8b9c3d7ac7e120258ab85648ba1a99c89651'
  }),
}

const parseXPaginationHeaders = headers => ({
  page: parseInt(headers.get('X-Pagination-Page'), 10),
  limit: parseInt(headers.get('X-Pagination-Limit'), 10),
  pageCount: parseInt(headers.get('X-Pagination-Page-Count'), 10),
  itemCount: parseInt(headers.get('X-Pagination-Item-Count'), 10)
})

const fetchSuccess = payload =>
  ({ type: A.FETCH_SHOWS_SUCCESS, payload })

const fetchThenDispatch = (dispatch, url, init) => {
  let pageCount = 0

  dispatch({ type: A.FETCH_SHOWS_REQUEST })
  return fetch(url, init)
    .then(respond => {
      const xPagination = parseXPaginationHeaders(respond.headers)
      pageCount = xPagination.pageCount
      return respond.json()
    })
    .then(page => fetchSuccess({ page, pageCount }))
    .then(dispatch)
    .catch(error => console.error(error))
}

export const getPage = (sort = S.WATCHED, page = 1, limit = 10) => dispatch => {
  const parameters = `extended=full&page=${page}&limit=${limit}`
  const url = `https://api.trakt.tv/shows/${sort}/all?${parameters}`
  return fetchThenDispatch(
    dispatch,
    url,
    myInit
  )
}