import CTG from '../../../constants/Categories'

export const getPage = (sort, page, limit = 10) =>
  Promise.resolve({
    category: CTG.SHOWS,
    ptr: sort,
    list: global._shows,
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
    list: global._search,
    headers: {
      page,
      limit,
      pageCount: 10,
      itemCount: 100
    }
  })