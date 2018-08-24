import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ShowRow from './ShowRow'
import { SORTS as S } from '../../constants'
import '../../stylesheets/ShowTable.css'

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

  componentDidUpdate({ match }) {
    const { onRelocation } = this.props
    const { sort, page } = this.props.match.params
    if (this.isParamsCanged(match.params))
      onRelocation(sort, page)
  }

  render() {
    const { match, history, data, onSort, onRelocation } = this.props

    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>title</th>
            <th>year</th>
            <th onClick={() => history.push(`/${S.WATCHED}/1`)}>watcher_count</th>
            <th onClick={() => history.push(`/${S.PLAYED}/1`)}>play_count</th>
            <th>collected_count</th>
            <th onClick={() => history.push(`/${S.COLLECTED}/1`)}>collector_count</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) =>
              <ShowRow
                key={index}
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
  onSort: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

Shows.defaultProps = {
  data: []
}

export default Shows