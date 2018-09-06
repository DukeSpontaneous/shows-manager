import {
  API_KEYS as K
} from '../../constants'

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

  let pageCount = 0
  return fetch(url, init)
    .then(respond => {
      pageCount = parseXPaginationHeaders(respond.headers).pageCount
      return respond.json()
    })
    .then(page => ({ page, pageCount }))
}