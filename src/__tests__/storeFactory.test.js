import storeFactory from '../storeFactory'
import {
  loadSortedPage,
  loadQueryPage,
  loadPoster
} from '../actions'

jest.mock('../actions/api/trakt')
jest.mock('../actions/api/fanart')

let store

describe('store loadQueryPage', () => {
  beforeAll(() => {
    store = storeFactory()
    store.dispatch(loadQueryPage())
  })

  it('should contain five query', () =>
    expect(store.getState().shows.list.length).toBe(5)
  )
})

describe('store loadSortedPage', () => {
  beforeAll(() => {
    store = storeFactory()
    store.dispatch(loadSortedPage())
  })

  it('should contain ten shows', () =>
    expect(store.getState().shows.list.length).toBe(10)
  )
})

describe('store loadPoster', () => {
  beforeAll(() => {
    store = storeFactory()
    store.dispatch(loadPoster())
  })

  it('should contain at last one chatacter', () =>
    expect(store.getState().poster.url.length).toBeGreaterThan(0)
  )
})
