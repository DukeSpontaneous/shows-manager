export const getPage = (sort, page, limit = 10) =>
  Promise.resolve({
    list: global._shows,
    pageCount: 10,
  })

export const searchShows = (query, page, limit = 10) =>
  Promise.resolve({
    list: global._search,
    pageCount: 10,
  })