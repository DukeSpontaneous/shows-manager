import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import URLWatcher from './URLWatcher'

import { Table, NavHeaders, ArrayRow } from '../../components/Table'

import { loadQueryPage } from '../../actions'

class QueryShowsTable extends Component {
  _mapParamsToAction = ({ query, page }) =>
    loadQueryPage(query, page)

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
      this._makeSortObject(`Comments`),
      this._makeSortObject(`Rating`),
      this._makeSortObject(`Runtime`),
      this._makeSortObject(`Votes`),
    ]} />
    return (
      <URLWatcher mapParamsToAction={this._mapParamsToAction}>
        <Table headers={headers}>
          {shows.list.map((item, index) =>
            <ArrayRow key={item.show.ids.trakt} onClick={onRowClicked(index)}
              array={[
                item.show.title,
                item.show.year,
                item.show.comment_count,
                item.show.rating,
                item.show.runtime,
                item.show.votes,
              ]} />
          )}
        </Table>
      </URLWatcher>
    )
  }
}

QueryShowsTable.propTypes = {
  history: PropTypes.object.isRequired,

  shows: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
}

const mapStateToProps = ({ shows }) => ({
  shows
})

export default compose(
  connect(mapStateToProps),
  withRouter
)(QueryShowsTable)