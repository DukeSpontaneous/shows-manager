import { connect } from 'react-redux'
import ShowTable from './ui/ShowTable'
import Pagination from './ui/Pagination'

import { getPage } from '../actions'

export const Shows = connect(
  ({ shows }, { match }) => ({
    shows
  }),
  dispatch => ({
    onRelocation(sort, page) {
      dispatch(getPage(sort, page))
    },
    onSort(sort) {
      dispatch(getPage(sort, 1))
    }
  })
)(ShowTable)

export const Pages = connect(
  ({ shows }, { match }) => ({
    pageCount: shows.pageCount,
    shows
  })
)(Pagination)