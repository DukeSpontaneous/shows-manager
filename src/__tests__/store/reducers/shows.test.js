import { ACTIONS as A } from '../../../constants'

import shows from '../../../store/reducers/shows'

const initialShows = {
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

describe('shows reducer', () => {
  const errorCopy = console.error
  beforeAll(() => {
    console.error = () => { }
  })
  afterAll(() => {
    console.error = errorCopy
  })

  it('loading state', () => {
    const action = { type: A.FETCH_SHOWS_REQUEST }
    const result = shows(initialShows, action).fetchShows
    expect(result).toEqual(
      {
        loading: true,
        success: false,
        failure: false
      })
  })
  it('success state', () => {
    const action = { type: A.FETCH_SHOWS_SUCCESS, payload: {} }
    const result = shows(initialShows, action).fetchShows
    expect(result).toEqual(
      {
        loading: false,
        success: true,
        failure: false
      })
  })
  it('failure state', () => {
    const action = { type: A.FETCH_SHOWS_FAILURE, payload: { error: `` } }
    const result = shows(initialShows, action).fetchShows
    expect(result).toEqual(
      {
        loading: false,
        success: false,
        failure: true
      })
  })

  it('without parameters', () => {
    const result = shows()
    expect(result).toEqual(initialShows)
  })
  it('undetermined action', () => {
    const action = { type: A.FETCH_POSTER_REQUEST }
    const result = shows(initialShows, action)
    expect(result).toEqual(initialShows)
  })
})
