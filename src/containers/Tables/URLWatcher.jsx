import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

class URLWatcher extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUrlChanged, match, mapParamsToAction } = nextProps
    const itsTimeToFetch = match.url !== prevState.url

    if (itsTimeToFetch) {
      compose(
        onUrlChanged,
        mapParamsToAction
      )(match.params)
      return { url: match.url }
    }
    return null
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

URLWatcher.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
}


const mapDispatchToProps = dispatch => ({
  onUrlChanged(action) {
    dispatch(action)
  }
})

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
)(URLWatcher)