import {
  CATEGORIES as CTG
} from '../../../constants'

import SHOWS_SAMPLE from './samples/shows.json'
import SEARCH_SAMPLE from './samples/search.json'

export const getPage = (sort, page, limit = 10) =>
  Promise.resolve({
    category: CTG.SHOWS,
    ptr: sort,
    list: SHOWS_SAMPLE,
    headers: {
      page,
      limit,
      pageCount: 10,
      itemCount: 100
    }
  })

export const searchShows = (query, page, limit = 10) =>
  Promise.resolve({
    category: CTG.SEARCH,
    ptr: query,
    list: SEARCH_SAMPLE,
    headers: {
      page,
      limit,
      pageCount: 10,
      itemCount: 100
    }
  })