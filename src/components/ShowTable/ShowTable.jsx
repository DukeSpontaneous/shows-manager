import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PlaceholderRow from './PlaceholderRow'
import ShowRow from './ShowRow'

import { table } from './showTable.css'

import { loadSortedPage, loadQueryPage } from '../../actions'
import { CATEGORIES as CTG, SORTS as S } from '../../constants'

class Shows extends Component {
  constructor(props) {
    super(props)
    this.state = { ptr: null, list: null }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onRelocation, match } = nextProps
    const { category: nCtg, ptr: nSort, page: nPage } = match.params
    const { category: pCtg, ptr: pSort, page: pPage } = prevState

    if (nCtg !== pCtg || nSort !== pSort || nPage !== pPage) {
      onRelocation(match)
      return { category: nCtg, ptr: nSort, page: nPage }
    }
    return null
  }

  makeRelocator = history => ptr =>
    () => history.push(`/shows/${ptr}/1`)

  render() {
    const { history, shows } = this.props
    const { list, fetchShows } = shows

    const relocator = this.makeRelocator(history)
    return (
      <div>
        <table className={table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th onClick={relocator(S.WATCHED)}>Watchers</th>
              <th onClick={relocator(S.PLAYED)}>Played</th>
              <th>Collected</th>
              <th onClick={relocator(S.COLLECTED)}>Collectors</th>
            </tr>
          </thead>
          <tbody>
            {
              fetchShows.loading ?
                <PlaceholderRow /> :
                list.map((item, index) =>
                  <ShowRow
                    id={index}
                    key={item.show.ids.trakt}
                    data={item}
                  />
                )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

Shows.propTypes = {
  history: PropTypes.object.isRequired,
  onRelocation: PropTypes.func.isRequired,
  shows: PropTypes.object.isRequired
}

export default connect(
  ({ shows }) => ({
    shows
  }),
  dispatch => ({
    onRelocation(match) {
      const { category, ptr, page } = match.params
      switch (category) {
        case CTG.SHOWS:
          dispatch(loadSortedPage(ptr, page))
          break
        case CTG.SEARCH:
          dispatch(loadQueryPage(ptr, page))
          break
        default:
          break
      }
    }
  })
)(Shows)