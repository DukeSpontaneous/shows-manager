import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { mount } from 'enzyme'

import SortedShowsTable from '../../../containers/Tables/SortedShowsTable'

jest.mock('../../../actions/api/trakt')

describe('<ShowsTable /> Component', () => {
  let wrapper
  const _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        shows: {
          list: global._shows
        },
      })
    )
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <HashRouter>
        <SortedShowsTable />
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