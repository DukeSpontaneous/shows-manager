import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ onSubmited }) => {
  let _query
  const submit = e => {
    e.preventDefault()
    onSubmited(_query.value)
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

Search.propTypes = {
  onSubmited: PropTypes.func.isRequired
}

export default Search