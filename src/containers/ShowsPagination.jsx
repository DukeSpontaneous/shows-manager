import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Pagination from '../components/Pagination'

const _makeOnClicked = (history, { category, ptr }) => page =>
  () => history.push(`/${category}/${ptr}/${page}`)

const ShowsPagination = ({ history, match, pageCount }) => {
  const onPageClicked = _makeOnClicked(history, match.params)
  const props = {
    current: parseInt(match.params.page, 10),
    total: pageCount,
    onPageClicked
  }
  return <Pagination {...props} />
}

ShowsPagination.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired
}

const mapStateToProps = ({ shows }) => ({
  pageCount: shows.headers.pageCount
})

export default withRouter(connect(
  mapStateToProps
)(ShowsPagination))