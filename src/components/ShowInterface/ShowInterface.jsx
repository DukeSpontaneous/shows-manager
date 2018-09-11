import React from 'react'

import Pagination from '../Pagination'
import SearchShows from '../SearchShows'
import ShowTable from '../ShowTable'

const ShowInterface = () =>
  <div>
    <SearchShows />
    <ShowTable />
    <Pagination />
  </div>

export default ShowInterface