import React from 'react'
import PropTypes from 'prop-types'

import { Row, Header } from '.';
import { NavLink } from 'react-router-dom'

import { activeLink } from './navHeaders.css'

const NavHeaders = ({ headers }) =>
  <Row>
    {
      headers.map(({ title, url }, index) =>
        <Header key={index}>
          {url ? <NavLink activeClassName={activeLink} to={url}>{title}</NavLink> : <p>{title}</p>}
        </Header>
      )
    }
  </Row>

NavHeaders.propTypes = {
  headers: PropTypes.array.isRequired
}

export default NavHeaders