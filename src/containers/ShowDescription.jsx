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
    this.state = { url: `` }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onPosterNeeded, match, shows } = nextProps

    const { url: pUrl } = prevState
    const { url: nUrl } = match

    const rowId = parseInt(match.params.rowId, 10)
    const itsTimeToFetch = shows.list[rowId] && shows.inProgress === false && nUrl !== pUrl
    if (itsTimeToFetch) {
      const tvdb = shows.list[rowId].show.ids.tvdb
      onPosterNeeded(tvdb)
      return { url: nUrl }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      rowId: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,

  history: PropTypes.object.isRequired,
  onPosterNeeded: PropTypes.func.isRequired,

  shows: PropTypes.shape({
    list: PropTypes.array.isRequired
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDescription))
