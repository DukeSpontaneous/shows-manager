import A from '../../constants/ActionTypes'

import shows from '../../reducers/shows'

const initialCopy = {
  inProgress: false,
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
    const result = shows(initialCopy, action).inProgress
    expect(result).toBeTruthy()
  })
  it('success state', () => {
    const action = { type: A.FETCH_SHOWS_SUCCESS, payload: {} }
    const result = shows(initialCopy, action).inProgress
    expect(result).toBeFalsy()
  })
  it('failure state', () => {
    const action = { type: A.FETCH_SHOWS_FAILURE, payload: { error: `` } }
    const result = shows(initialCopy, action).inProgress
    expect(result).toBeFalsy()
  })

  it('without parameters', () => {
    const result = shows()
    expect(result).toEqual(initialCopy)
  })
  it('undetermined action', () => {
    const action = { type: A.FETCH_POSTER_REQUEST }
    const result = shows(initialCopy, action)
    expect(result).toBe(initialCopy)
  })
})
