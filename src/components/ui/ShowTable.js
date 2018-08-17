import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ShowRow from './ShowRow'

class Shows extends Component {
  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>title</th>
              <th>year</th>
              <th>watcher_count</th>
              <th>play_count</th>
              <th>collected_count</th>
              <th>collector_count</th>
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
      </div>
    )
  }
}

Shows.propTypes = {
  onInit: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

Shows.defaultProps = {
  data: []
}

export default Shows