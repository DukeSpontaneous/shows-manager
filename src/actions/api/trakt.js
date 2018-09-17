import K from '../../constants/ApiKeys'
import CTG from '../../constants/Categories'

const parseXPaginationHeaders = headers => ({
  page: parseInt(headers.get(`X-Pagination-Page`), 10),
  limit: parseInt(headers.get(`X-Pagination-Limit`), 10),
  pageCount: parseInt(headers.get(`X-Pagination-Page-Count`), 10),
  itemCount: parseInt(headers.get(`X-Pagination-Item-Count`), 10)
})

const init = {
  method: `GET`,
  headers: new Headers({
    'Content-Type': `application/json`,
    'trakt-api-version': `2`,
    'trakt-api-key': K.TRAKT
  }),
}

export const getPage = (sort, page, limit) => {
  const parameters = `extended=full&page=${page}&limit=${limit}`
  const url = `https://api.trakt.tv/shows/${sort}/all?${parameters}`

  let headers = {}
  return fetch(url, init)
    .then(respond => {
      headers = parseXPaginationHeaders(respond.headers)
      return respond.json()
    })
    .then(list => ({ category: CTG.SHOWS, ptr: sort, list, headers }))
}

export const searchShows = (query, page, limit) => {
  const parameters = `extended=full&page=${page}&limit=${limit}&query=${query}`
  const url = `https://api.trakt.tv/search/show?${parameters}`

  let headers = {}
  return fetch(url, init)
    .then(respond => {
      headers = parseXPaginationHeaders(respond.headers)
      return respond.json()
    })
    .then(list => ({ category: CTG.SEARCH, ptr: query, list, headers }))
}