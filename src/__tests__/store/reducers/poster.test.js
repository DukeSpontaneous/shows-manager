import { ACTIONS as A } from '../../../constants'

import poster from '../../../store/reducers/poster'

const initialPoster = {
  fetchPoster: {
    loading: false,
    success: false,
    failure: false
  },
  url: ``
}

describe('poster reducer', () => {
  const errorCopy = console.error
  beforeAll(() => {
    console.error = () => { }
  })
  afterAll(() => {
    console.error = errorCopy
  })

  it('loading state', () => {
    const action = { type: A.FETCH_POSTER_REQUEST }
    const result = poster(initialPoster, action).fetchPoster
    expect(result).toEqual(
      {
        loading: true,
        success: false,
        failure: false
      })
  })
  it('success state', () => {
    const action = { type: A.FETCH_POSTER_SUCCESS, payload: {} }
    const result = poster(initialPoster, action).fetchPoster
    expect(result).toEqual(
      {
        loading: false,
        success: true,
        failure: false
      })
  })
  it('failure state', () => {
    const action = { type: A.FETCH_POSTER_FAILURE, payload: { error: `` } }
    const result = poster(initialPoster, action).fetchPoster
    expect(result).toEqual(
      {
        loading: false,
        success: false,
        failure: true
      })
  })

  it('without parameters', () => {
    const result = poster()
    expect(result).toEqual(initialPoster)
  })
  it('undetermined action', () => {
    const action = { type: A.FETCH_SHOWS_REQUEST }
    const result = poster(initialPoster, action)
    expect(result).toEqual(initialPoster)
  })
})
