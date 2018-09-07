import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ShowRow from './ShowRow'
import PlaceholderRow from './PlaceholderRow'
import { table } from './showTable.css'

import { loadPage } from '../../actions'
import { SORTS as S } from '../../constants'

class Shows extends Component {
  componentDidMount() {
    const { match, onRelocation } = this.props
    const { sort, page } = match.params
    onRelocation(sort, page)
  }

  isParamsCanged(params) {
    const { sort, page } = this.props.match.params
    return page !== params.page ||
      sort !== params.sort
  }

  componentDidUpdate(prevProps) {
    const { onRelocation } = this.props
    const { sort, page } = this.props.match.params
    if (this.isParamsCanged(prevProps.match.params))
      onRelocation(sort, page)
  }

  makeRelocator(history, sort) {
    return () => history.push(`/${sort}/1`)
  }

  render() {
    const { history, shows } = this.props
    const { page, fetchShows } = shows

    return (
      <table className={table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th onClick={this.makeRelocator(history, S.WATCHED)}>Watchers</th>
            <th onClick={this.makeRelocator(history, S.PLAYED)}>Played</th>
            <th>Collected</th>
            <th onClick={this.makeRelocator(history, S.COLLECTED)}>Collectors</th>
          </tr>
        </thead>
        <tbody>
          {
            fetchShows.loading ?
              <PlaceholderRow /> :
              page.map((item, index) =>
                <ShowRow
                  id={index}
                  key={item.show.ids.trakt}
                  data={item}
                />
              )
          }
        </tbody>
      </table>
    )
  }
}

Shows.propTypes = {
  onRelocation: PropTypes.func.isRequired,
  shows: PropTypes.object.isRequired
}

export default connect(
  ({ shows }) => ({
    shows
  }),
  dispatch => ({
    onRelocation(sort, page) {
      dispatch(loadPage(sort, page))
    }
  })
)(Shows)