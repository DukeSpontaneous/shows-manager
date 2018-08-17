import PropTypes from 'prop-types'
import React from 'react'

const ShowRow = ({ data }) => (
  <tr>
    <td>{data.show.title}</td>
    <td>{data.show.year}</td>
    <td>{data.watcher_count}</td>
    <td>{data.play_count}</td>
    <td>{data.collected_count}</td>
    <td>{data.collector_count}</td>
  </tr>
)

ShowRow.propTypes = {
  data: PropTypes.object.isRequired
}

export default ShowRow