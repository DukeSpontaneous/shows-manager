import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Table, NavHeaders, ArrayRow } from '../../components/Table'

import { loadSortedPage } from '../../actions'

import S from '../../constants/SortTypes'

class QueryShowsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUrlChanged, match } = nextProps
    const itsTimeToFetch = match.url !== prevState.url

    if (itsTimeToFetch) {
      onUrlChanged(match.params)
      return { url: match.url }
    }
    return null
  }

  _makeSortObject = (title, sort) =>
    ({ title, url: sort && `/shows/${sort}` })

  _makeOnRowClicked = history => index =>
    () => history.push(`${history.location.pathname}/${index}`)

  render() {
    const { history, shows } = this.props

    const onRowClicked = this._makeOnRowClicked(history)

    const headers = <NavHeaders headers={[
      this._makeSortObject(`Title`),
      this._makeSortObject(`Year`),
      this._makeSortObject(`Watchers`, S.WATCHED),
      this._makeSortObject(`Played`, S.PLAYED),
      this._makeSortObject(`Collected`),
      this._makeSortObject(`Collectors`, S.COLLECTED),
    ]} />
    return (
      <Table headers={headers}>
        {shows.list.map((item, index) =>
          <ArrayRow key={item.show.ids.trakt} onClick={onRowClicked(index)}
            array={[
              item.show.title,
              item.show.year,
              item.watcher_count,
              item.play_count,
              item.collected_count,
              item.collector_count
            ]} />
        )}
      </Table>
    )
  }
}

QueryShowsTable.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  onUrlChanged: PropTypes.func.isRequired,

  shows: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
}

const mapStateToProps = ({ shows }) => ({
  shows
})

const mapDispatchToProps = dispatch => ({
  onUrlChanged({ sort, page }) {
    dispatch(loadSortedPage(sort, page))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryShowsTable))