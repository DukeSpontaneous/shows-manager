import React from 'react'

import Pagination from '../components/Pagination'
import SearchShows from '../components/SearchShows'
import ShowTable from './ShowsTable'

const ShowInterface = () =>
  <div>
    <SearchShows />
    <ShowTable />
    <Pagination />
  </div>

export default ShowInterface