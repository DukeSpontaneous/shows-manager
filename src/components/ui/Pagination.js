import React from 'react'
import { withRouter } from 'react-router'

const Pagination = ({ match, totalPages }) => {
  const { sort, page } = match.params
  console.log(match.params)

  return (
    <div>
      <button>{sort}</button>
      <span>{page}</span>
      <button />
    </div>
  )
}

export default withRouter(Pagination)