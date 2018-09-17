import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { loadPoster } from '../../actions'
import Loader from '../Loader'
import Modal from '../Modal'
import { closeButton, imageStyle, description } from './showDescription.css'

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

  render() {
    const { history, match, poster, shows } = this.props;
    const { rowId } = match.params
    const show = shows.list[rowId] && shows.list[rowId].show
    const { url, inProgress } = poster

    const { category, ptr, page } = match.params
    const onClose = () => history.push(`/${category}/${ptr}/${page}`)
    const article = show ?
      <div>
        <h1>{show.title}</h1>
        <p>{show.overview}</p>
      </div> : <Loader />
    const image = inProgress ?
      <Loader /> :
      <img className={imageStyle}
        src={url}
        alt="Poster"
      />
    return (
      <Modal history={history} match={match}>
        <button className={closeButton} onClick={onClose}>Close</button>
        <div className={description}>
          {article}
          {image}
        </div>
      </Modal>
    )
  }
}

ShowDescription.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onPosterNeeded: PropTypes.func.isRequired,
  shows: PropTypes.object.isRequired,
  poster: PropTypes.object.isRequired
}

export default withRouter(connect(
  ({ shows, poster }) => ({
    shows,
    poster
  }),
  dispatch => ({
    onPosterNeeded(tvdb) {
      dispatch(loadPoster(tvdb))
    }
  })
)(ShowDescription))
