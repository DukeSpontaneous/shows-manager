import POSTER_SAMPLE from '../../../actions/api/__mocks__/samples/poster.json'

import storeFactory from '../../../store'
import { loadPoster } from '../../../actions'

jest.mock('../../../actions/api/trakt')

describe('fanart api', () => {
  let store

  const realFetch = global.fetch
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve(POSTER_SAMPLE)
    })
  )

  beforeAll(() => {
    global.fetch = mockFetch
    store = storeFactory()
    store.dispatch(loadPoster())
  })
  afterAll(() => {
    global.fetch = realFetch
  })

  it('should contain at last one chatacter', () =>
    expect(store.getState().poster.url.length).toBeGreaterThan(0)
  )
  it('should be successfully completed', () =>
    expect(store.getState().poster.fetchPoster.success).toBeTruthy()
  )
})
