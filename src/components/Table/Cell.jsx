import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ children, onClick }) =>
  <td onClick={onClick}>
    {children}
  </td>

Cell.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Cell