import React from 'react'
import Loader from '../Loader'

const PlaceholderRow = () =>
  <tr>
    {
      new Array(6)
        .fill({})
        .map((item, i) => <td key={i}><Loader /></td>)
    }
  </tr>

export default PlaceholderRow