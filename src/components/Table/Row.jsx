import React from 'react'
import PropTypes from 'prop-types'

const Row = ({ children, onClick }) =>
  <tr onClick={onClick}>
    {children}
  </tr>

Row.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default Row