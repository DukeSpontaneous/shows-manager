import { connect } from 'react-redux'
import ShowTable from './ui/ShowTable'
import Pagination from './ui/Pagination'
import ShowDescription from './ui/ShowDescription'

import { getPage } from '../actions'

export const Shows = connect(
  ({ shows }, { match }) => ({
    shows
  }),
  dispatch => ({
    onRelocation(sort, page) {
      dispatch(getPage(sort, page))
    }
  })
)(ShowTable)

export const Pages = connect(
  ({ shows }, { match }) => ({
    pageCount: shows.pageCount,
    shows
  })
)(Pagination)

export const Show = connect(
  (proos, state) => ({
  })
)(ShowDescription)