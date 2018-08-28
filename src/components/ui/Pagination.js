import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ history, match, pageCount, shows }) => {
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
          <button onClick={() => history.push(`/${sort}/1`)}>{`<<`}</button> : ``
      }
      {
        prePages.map((num, index) => <button onClick={() => history.push(`/${sort}/${num}`)} key={index}>{num}</button>)
      }
      {page}
      {
        nextPages.map((num, index) => <button onClick={() => history.push(`/${sort}/${num}`)} key={index}>{num}</button>)
      }
      {
        n < pageCount - 3 ?
          <button onClick={() => history.push(`/${sort}/${pageCount}`)}>{`>>`}</button> : ``
      }
    </div>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  shows: PropTypes.object.isRequired
}

export default Pagination