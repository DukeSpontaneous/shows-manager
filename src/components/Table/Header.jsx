import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ children, onClick }) =>
  <th onClick={onClick}>
    {children}
  </th>

Header.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Header