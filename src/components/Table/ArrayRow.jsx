import React from 'react'
import PropTypes from 'prop-types'

import { Row, Cell } from '.';

const ArrayRow = ({ array, onClick }) =>
  <Row onClick={onClick}>
    {array.map((item, index) => <Cell key={index}>{item}</Cell>)}
  </Row>

ArrayRow.propTypes = {
  array: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

export default ArrayRow