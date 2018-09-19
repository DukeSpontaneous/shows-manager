import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Table, Row, Header, Cell } from '../components/Table'

import { loadSortedPage, loadQueryPage } from '../actions'

import CTG from '../constants/Categories'
import S from '../constants/SortTypes'

class ShowsTable extends Component {
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

ShowsTable.propTypes = {
  history: PropTypes.object.isRequired,
  onRelocation: PropTypes.func.isRequired,
  shows: PropTypes.object.isRequired
}

const mapStateToProps = ({ shows }) => ({
  shows
})

const mapDispatchToProps = dispatch => ({
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowsTable))