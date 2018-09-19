import React from 'react'

import ShowsPagination from './ShowsPagination'
import ShowsSearch from './ShowsSearch'
import ShowTable from './ShowsTable'

const ShowInterface = () =>
  <div>
    <ShowsSearch />
    <ShowTable />
    <ShowsPagination />
  </div>

export default ShowInterface