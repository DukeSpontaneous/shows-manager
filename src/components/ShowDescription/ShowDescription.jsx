import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { loadPoster } from '../../actions'
import Loader from '../Loader'
import {
  modal,
  closeButton,
  imageStyle,
  description
} from './showDescription.css'

const Modal = ComposedComponent => ({ history }) =>
  ReactDOM.createPortal(
    <div className={modal}>
      <button className={closeButton} onClick={() => history.goBack()}>Close</button>
      <ComposedComponent />
    </div>,
    document.getElementById('portal')
  )

class ShowDescription extends Component {
  componentDidMount() {
    const { shows, match, onPosterNeeded } = this.props
    const { rowId } = match.params
    const tvdb = shows.page[rowId].show.ids.tvdb
    onPosterNeeded(tvdb)
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    const { shows, poster, match } = this.props;
    const { url, fetchPoster } = poster
    const { rowId } = match.params
    const show = shows.page[rowId].show

    return (
      <div className={description}>

        <div>
          <h1>{show.title}</h1>
          <p>{show.overview}</p>
        </div>

        {
          fetchPoster.loading ?
            <Loader /> :
            <img className={imageStyle}
              src={url}
              alt="Poster"
            />
        }
      </div>
    )
  }
}

ShowDescription.propTypes = {
  onPosterNeeded: PropTypes.func.isRequired,
  poster: PropTypes.object.isRequired
}

export default Modal(connect(
  ({ shows, poster }) => ({
    shows,
    poster
  }),
  dispatch => ({
    onPosterNeeded(tvdb) {
      dispatch(loadPoster(tvdb))
    }
  })
)(withRouter(ShowDescription)))
