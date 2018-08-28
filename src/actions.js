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
  page: headers.get('X-Pagination-Page'),
  limit: headers.get('X-Pagination-Limit'),
  pageCount: headers.get('X-Pagination-Page-Count'),
  itemCount: headers.get('X-Pagination-Item-Count')
})

const fetchThenDispatch = (dispatch, url, init) => {
  let pageCount = 0

  dispatch({ type: A.FETCH_SHOWS_REQUEST })
  return fetch(url, init)
    .then(respond => {
      const xPagination = parseXPaginationHeaders(respond.headers)
      pageCount = parseInt(xPagination.pageCount, 10)
      console.log(pageCount)
      return respond.json()
    })
    .then(page => ({ type: A.FETCH_SHOWS_SUCCESS, payload: { page, pageCount } }))
    .then(dispatch)
    .catch(error => console.error(error))
}

export const getPage = (sort = S.WATCHED, page = 1, limit = 10) => dispatch => {
  const parameters = `page=${page}&limit=${limit}`
  const url = `https://api.trakt.tv/shows/${sort}/all?${parameters}`
  return fetchThenDispatch(
    dispatch,
    url,
    myInit
  )
}