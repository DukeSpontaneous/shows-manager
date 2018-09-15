import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { mount } from 'enzyme'

import ShowDescription from '../../../components/ShowDescription'

jest.mock('../../../actions/api/trakt')

describe('Empty <ShowDescription /> Component', () => {
  let wrapper
  const _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        shows: {
          list: [],
          fetchShows: {},
          headers: {}
        },
        poster: {
          fetchPoster: {}
        },
      })
    )
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <HashRouter>
        <ShowDescription />
      </HashRouter>
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('contain three img', () =>
    expect(wrapper
      .find('img')
      .length
    ).toBe(3)
  )
})