import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { loadPoster } from '../actions'

import ModalDescription from '../components/ModalDescription'
import ModalLoader from '../components/ModalLoader'

class ShowDescription extends Component {
  constructor(props) {
    super(props)
    this.state = { rowId: -1 }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onPosterNeeded, match, shows } = nextProps
    const { headers } = shows
    const { category, ptr } = match.params
    const page = parseInt(match.params.page, 10)
    const nRowId = parseInt(match.params.rowId, 10)
    if (category !== shows.category || ptr !== shows.ptr || page !== headers.page)
      return { rowId: -1 }

    const { rowId: pRowId } = prevState
    if (shows.list[nRowId] && nRowId !== pRowId) {
      const tvdb = shows.list[nRowId].show.ids.tvdb
      onPosterNeeded(tvdb)
      return { rowId: nRowId }
    }
    return null
  }

  _makeOnClose = (history, { category, ptr, page }) =>
    () => history.push(`/${category}/${ptr}/${page}`)

  render() {
    const { history, match, poster, shows } = this.props;
    const { rowId } = match.params
    const show = shows.list[rowId] && shows.list[rowId].show
    const { url, inProgress } = poster

    const onClose = this._makeOnClose(history, match.params)

    const args = {
      title: show && show.title,
      overview: show && show.overview,
      imgUrl: url,
      onClose
    }
    return inProgress ? <ModalLoader /> : <ModalDescription {...args} />
  }
}

ShowDescription.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onPosterNeeded: PropTypes.func.isRequired,
  shows: PropTypes.object.isRequired,
  poster: PropTypes.object.isRequired
}

const mapStateToProps = ({ shows, poster }) => ({
  shows,
  poster
})

const mapDispatchToProps = dispatch => ({
  onPosterNeeded(tvdb) {
    dispatch(loadPoster(tvdb))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDescription))
