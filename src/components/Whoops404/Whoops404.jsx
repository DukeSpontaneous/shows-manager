import React from 'react'

const Whoops404 = ({ location }) =>
  <h1>Invalid location: '{location && location.pathname}'</h1>

export default Whoops404