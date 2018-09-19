import React from 'react'
import PropTypes from 'prop-types'

const numberRange = (start, end) =>
  new Array(end - start + 1).fill().map((d, i) => i + start)

const Pagination = ({ current, total, onPageClicked }) => {
  let buttons = numberRange(-2, 2)
    .map(item => item + current)
    .filter(page => page > 0 && page <= total)
    .map(page =>
      <button onClick={onPageClicked(page)}
        disabled={page === current} key={page}>
        {page}
      </button>
    )
  buttons = [
    current > 3 &&
    <button onClick={onPageClicked(1)} key={1}>{`<<`}</button>,
    ...buttons,
    current < total - 3 &&
    <button onClick={onPageClicked(total)} key={total}>{`>>`}</button>,
  ]

  return <div>{buttons}</div>
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageClicked: PropTypes.func.isRequired
}

export default Pagination