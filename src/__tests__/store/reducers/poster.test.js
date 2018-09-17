import { ACTIONS as A } from '../../../constants'

import poster from '../../../store/reducers/poster'

const initialCopy = {
  inProgress: false,
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
    const result = poster(initialCopy, action).inProgress
    expect(result).toBeTruthy()
  })
  it('success state', () => {
    const action = { type: A.FETCH_POSTER_SUCCESS, payload: {} }
    const result = poster(initialCopy, action).inProgress
    expect(result).toBeFalsy()
  })
  it('failure state', () => {
    const action = { type: A.FETCH_POSTER_FAILURE, payload: { error: `` } }
    const result = poster(initialCopy, action).inProgress
    expect(result).toBeFalsy()
  })

  it('without parameters', () => {
    const result = poster()
    expect(result).toEqual(initialCopy)
  })
  it('undetermined action', () => {
    const action = { type: A.FETCH_SHOWS_REQUEST }
    const result = poster(initialCopy, action)
    expect(result).toBe(initialCopy)
  })
})
