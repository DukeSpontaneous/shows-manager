import React from 'react'
import PropTypes from 'prop-types'

import { table } from './table.css'

const Table = ({ headers, children }) =>
  <table className={table}>
    <thead>
      {headers}
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>

Table.propTypes = {
  headers: PropTypes.node,
  children: PropTypes.node,
}

export default Table