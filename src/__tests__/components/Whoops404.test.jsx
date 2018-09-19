import { shallow } from 'enzyme'

import Whoops404 from '../../components/Whoops404'

describe('<Whoops404 /> UI Component', () => {
  it('contain two children Whoops404', () =>
    expect(
      shallow(<Whoops404 />)
        .find('h1')
        .children()
        .length
    ).toBe(2)
  )
  it('contain three children', () =>
    expect(
      shallow(<Whoops404 location={{ pathname: 'test' }} />)
        .find('h1')
        .children()
        .length
    ).toBe(3)
  )
})