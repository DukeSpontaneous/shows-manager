import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ children, onClick }) =>
  <td onClick={onClick}>
    {children}
  </td>

Header.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Header