import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const ShowRow = ({ data, id, history }) =>
  <tr onClick={() => history.push(`${history.location.pathname}/${id}`)}>
    <td>{data.show.title}</td>
    <td>{data.show.year}</td>
    <td>{data.watcher_count}</td>
    <td>{data.play_count}</td>
    <td>{data.collected_count}</td>
    <td>{data.collector_count}</td>
  </tr>

ShowRow.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(ShowRow)