import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Pagination from '../components/Pagination'

const _makeOnClicked = (history, { ptr1, ptr2 }) => page =>
  () => history.push(`/${ptr1}/${ptr2}/${page}`)

const RoutePagination = ({ history, match, pageCount }) => {
  const onPageClicked = _makeOnClicked(history, match.params)
  const props = {
    current: parseInt(match.params.page, 10),
    total: pageCount,
    onPageClicked
  }
  return <Pagination {...props} />
}

RoutePagination.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ptr1: PropTypes.string.isRequired,
      ptr2: PropTypes.string.isRequired,
      page: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,

  history: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired
}

const mapStateToProps = ({ shows }) => ({
  pageCount: shows.pageCount
})

export default withRouter(connect(
  mapStateToProps
)(RoutePagination))