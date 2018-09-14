import storeFactory from '../../store'
import {
  ACTIONS as A,
  CATEGORIES as CTG
} from '../../constants'
import {
  loadSortedPage,
  loadQueryPage,
  loadPoster
} from '../../actions'

jest.mock('../../actions/api/trakt')
jest.mock('../../actions/api/fanart')

let store
const shows = [
  {
    fetchShows: {
      loading: false,
      success: false,
      failure: false
    },
    list: [],
    headers: { pageCount: 0 },
    category: ``,
    ptr: ``
  }
]
const poster = [
  {
    fetchPoster: {
      loading: false,
      success: false,
      failure: false
    },
    url: ``
  }
]

describe('store loadQueryPage', () => {
  beforeAll(() => {
    store = storeFactory({ shows, poster })
    store.dispatch(loadQueryPage())
  })

  it('should contain five query', () =>
    expect(store.getState().shows.list.length).toBe(5)
  )
})

describe('store loadSortedPage', () => {
  beforeAll(() => {
    store = storeFactory({ shows, poster })
    store.dispatch(loadSortedPage())
  })

  it('should contain ten shows', () =>
    expect(store.getState().shows.list.length).toBe(10)
  )
})

describe('store loadPoster', () => {
  beforeAll(() => {
    store = storeFactory({ shows, poster })
    store.dispatch(loadPoster())
  })

  it('should contain at last one chatacter', () =>
    expect(store.getState().poster.url.length).toBeGreaterThan(0)
  )
})
