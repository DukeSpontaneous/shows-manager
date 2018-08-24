import { connect } from 'react-redux'
import ShowTable from './ui/ShowTable'

import { getPage } from '../actions'

export const Shows = connect(
  (state, { match }) => {
    const { data } = state
    const { sort, page } = match.params
    return {
      data
    }
  },
  dispatch => ({
    onRelocation(sort, page) {
      dispatch(getPage(sort, page))
    },
    onSort(sort) {
      dispatch(getPage(sort, 1))
    }
  })
)(ShowTable)