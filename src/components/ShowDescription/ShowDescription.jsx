import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { loadPoster } from '../../actions'
import Loader from '../Loader'
import { modal, closeButton, imageStyle, description } from './showDescription.css'

const Modal = ({ children, history, match }) => {
  const { sort, page } = match.params
  const url = `/${sort}/${page}`
  return ReactDOM.createPortal(
    <div className={modal}>
      <button className={closeButton} onClick={() => history.push(url)}>Close</button>
      {children}
    </div>,
    document.getElementById('portal')
  )
}

class ShowDescription extends Component {
  constructor(props) {
    super(props)
    this.state = { rowId: -1 }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onPosterNeeded, match, shows } = nextProps
    const { headers } = shows
    const { sort } = match.params
    const page = parseInt(match.params.page, 10)
    const nRowId = parseInt(match.params.rowId, 10)
    if (sort !== shows.sort || page !== headers.page)
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
    const { url, fetchPoster } = poster

    return (
      <Modal history={history} match={match}>
        <div className={description}>
          {show ?
            <div>
              <h1>{show.title}</h1>
              <p>{show.overview}</p>
            </div>
            :
            <div>
              <Loader />
              <Loader />
            </div>
          }
          {fetchPoster.loading ?
            <Loader />
            :
            <img className={imageStyle}
              src={url}
              alt="Poster"
            />
          }
        </div>
      </Modal>
    )
  }
}

ShowDescription.propTypes = {
  onPosterNeeded: PropTypes.func.isRequired,
  poster: PropTypes.object.isRequired
}

export default connect(
  ({ shows, poster }) => ({
    shows,
    poster
  }),
  dispatch => ({
    onPosterNeeded(tvdb) {
      dispatch(loadPoster(tvdb))
    }
  })
)(withRouter(ShowDescription))
