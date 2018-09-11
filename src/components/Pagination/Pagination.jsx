import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const makeRelocator = (history, category, sort) => page =>
  () => history.push(`/${category}/${sort}/${page}`)

const Pagination = ({ history, match, pageCount }) => {
  const { category, ptr, page } = match.params
  const n = parseInt(page, 10)
  const prePages = [n - 3, n - 2, n - 1]
    .filter(x => x > 0)
  const nextPages = [n + 1, n + 2, n + 3]
    .filter(x => x <= pageCount)

  const relocator = makeRelocator(history, category, ptr)
  return (
    <div>
      {
        n > 4 ?
          <button onClick={relocator(1)}>{`<<`}</button> : ``
      }
      {
        prePages.map((num, index) => <button onClick={relocator(num)} key={index}>{num}</button>)
      }
      <button disabled>{page}</button>
      {
        nextPages.map((num, index) => <button onClick={relocator(num)} key={index}>{num}</button>)
      }
      {
        n < pageCount - 3 ?
          <button onClick={relocator(pageCount)}>{`>>`}</button> : ``
      }
    </div>
  )
}

Pagination.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired
}

export default withRouter(connect(
  ({ shows }) => ({
    pageCount: shows.headers.pageCount
  })
)(Pagination))