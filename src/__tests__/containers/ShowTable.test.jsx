import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { mount } from 'enzyme'

import ShowsTable from '../../containers/ShowsTable'

jest.mock('../../actions/api/trakt')

describe('<ShowsTable /> Component', () => {
  let wrapper
  const _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        shows: {
          list: global._shows,
          fetchShows: {}
        },
      })
    )
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <HashRouter>
        <ShowsTable />
      </HashRouter>
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('contain ten children', () =>
    expect(wrapper
      .find('tbody')
      .children()
      .length
    ).toBe(10)
  )
})