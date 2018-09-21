import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import { loadPoster } from '../actions'

import ModalDescription from '../components/ModalDescription'
import ModalLoader from '../components/ModalLoader'

class ShowDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onPosterNeeded, match, shows } = nextProps

    const rowId = parseInt(match.params.rowId, 10)
    const itsTimeToFetch = shows.list[rowId] && shows.inProgress === false && match.url !== prevState.url
    if (itsTimeToFetch) {
      const tvdb = shows.list[rowId].show.ids.tvdb
      onPosterNeeded(tvdb)
      return { url: match.url }
    }
    return null
  }

  _makeOnClose = (history, { ptr1, ptr2, ptr3 }) =>
    () => history.push(`/${ptr1}/${ptr2}/${ptr3}`)

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
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      rowId: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,

  onPosterNeeded: PropTypes.func.isRequired,

  shows: PropTypes.shape({
    list: PropTypes.array.isRequired,
    inProgress: PropTypes.bool.isRequired
  }).isRequired,
  poster: PropTypes.shape({
    url: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired
  }).isRequired
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ShowDescription)
