import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  constructor(props) {
    super(props)
    this._submit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()

    const input = this.input
    this.props.onSubmited(input.value)
    input.value = ''
    input.focus()
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submit}>
          <input
            type='text'
            name='search'
            placeholder='Search...'
            ref={input => this.input = input}
            required
          />
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  onSubmited: PropTypes.func.isRequired
}

export default Search