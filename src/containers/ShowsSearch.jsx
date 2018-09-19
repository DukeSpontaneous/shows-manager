import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import Search from '../components/Search'

const _makeOnSubmited = history => query =>
  history.push(`/search/${query}/1`)

const ShowsSearch = ({ history }) => {
  const onSubmited = _makeOnSubmited(history)
  return <Search onSubmited={onSubmited} />
}

ShowsSearch.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(ShowsSearch)