import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Table, Row, Header, Cell } from '../../components/Table'

import { loadQueryPage } from '../../actions'

import S from '../../constants/SortTypes'

class QueryShowsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, page: null }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onAddressChanged, match } = nextProps
    const { query: nQuery, page: nPage } = match.params
    const { query: pQuery, page: pPage } = prevState

    const itsTimeToFetch = nQuery !== pQuery || nPage !== pPage
    if (itsTimeToFetch) {
      onAddressChanged(nQuery, nPage)
      return { query: nQuery, page: nPage }
    }
    return null
  }

  _makeOnHeaderClicked = history => ptr =>
    () => history.push(`/shows/${ptr}/1`)

  _makeOnRowClicked = history => index =>
    () => history.push(`${history.location.pathname}/${index}`)

  render() {
    const { history, shows } = this.props
    const { list } = shows

    const onHeaderClicked = this._makeOnHeaderClicked(history)
    const onRowClicked = this._makeOnRowClicked(history)

    const headers = (
      <Row>
        <Header>
          Title
        </Header>
        <Header>
          Year
        </Header>
        <Header>
          <button onClick={onHeaderClicked(S.WATCHED)}>Watchers</button>
        </Header>
        <Header>
          <button onClick={onHeaderClicked(S.PLAYED)}>Played</button>
        </Header>
        <Header>
          Collected
        </Header>
        <Header>
          <button onClick={onHeaderClicked(S.COLLECTED)}>Collectors</button>
        </Header>
      </Row>
    )

    return (
      <Table headers={headers}>
        {list.map((item, index) =>
          <Row key={item.show.ids.trakt} onClick={onRowClicked(index)}>
            <Cell>{item.show.title}</Cell>
            <Cell>{item.show.year}</Cell>
            <Cell>{item.watcher_count}</Cell>
            <Cell>{item.play_count}</Cell>
            <Cell>{item.collected_count}</Cell>
            <Cell>{item.collector_count}</Cell>
          </Row>
        )}
      </Table>
    )
  }
}

QueryShowsTable.propTypes = {
  history: PropTypes.object.isRequired,
  onAddressChanged: PropTypes.func.isRequired,

  shows: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
}

const mapStateToProps = ({ shows }) => ({
  shows
})

const mapDispatchToProps = dispatch => ({
  onAddressChanged(query, page) {
    dispatch(loadQueryPage(query, page))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryShowsTable))