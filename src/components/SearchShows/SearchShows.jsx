import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

const SearchShows = ({ history }) => {
  let _query
  const submit = e => {
    e.preventDefault()
    history.push(`/search/${_query.value}/1`)
    _query.value = ''
    _query.focus()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type='text'
          name='search'
          placeholder='Search...'
          ref={input => _query = input}
          required
        />
      </form>
    </div>
  )
}

SearchShows.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SearchShows)