import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const makeRelocator = (history, category, sort) => page =>
  () => history.push(`/${category}/${sort}/${page}`)

const Pagination = ({ history, match, pageCount }) => {
  const { category, ptr, page } = match.params
  const curPage = parseInt(page, 10)
  const prevPages = [curPage - 3, curPage - 2, curPage - 1]
    .filter(x => x > 0)
  const nextPages = [curPage + 1, curPage + 2, curPage + 3]
    .filter(x => x <= pageCount)

  const relocator = makeRelocator(history, category, ptr)
  return (
    <div>
      {
        curPage > 4 ?
          <button onClick={relocator(1)}>{`<<`}</button> : ``
      }
      {
        prevPages.map((num, index) => <button onClick={relocator(num)} key={index}>{num}</button>)
      }
      <button disabled>{page}</button>
      {
        nextPages.map((num, index) => <button onClick={relocator(num)} key={index}>{num}</button>)
      }
      {
        curPage < pageCount - 3 ?
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