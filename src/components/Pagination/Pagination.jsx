import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Pagination = ({ history, match, pageCount }) => {
  const { sort, page } = match.params
  const n = parseInt(page, 10)
  const prePages = [n - 3, n - 2, n - 1]
    .filter(x => x > 0)
  const nextPages = [n + 1, n + 2, n + 3]
    .filter(x => x <= pageCount)

  return (
    <div>
      {
        n > 4 ?
          <button onClick={makeRelocator(history, sort, 1)}>{`<<`}</button> : ``
      }
      {
        prePages.map((num, index) => <button onClick={makeRelocator(history, sort, num)} key={index}>{num}</button>)
      }
      <button disabled>{page}</button>
      {
        nextPages.map((num, index) => <button onClick={makeRelocator(history, sort, num)} key={index}>{num}</button>)
      }
      {
        n < pageCount - 3 ?
          <button onClick={makeRelocator(history, sort, pageCount)}>{`>>`}</button> : ``
      }
    </div>
  )
}

const makeRelocator = (history, sort, page) =>
  () => history.push(`/${sort}/${page}`)

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired
}

export default connect(
  ({ shows }, { match }) => ({
    pageCount: shows.headers.pageCount
  })
)(Pagination)