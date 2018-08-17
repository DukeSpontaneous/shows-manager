import { connect } from 'react-redux'
import ShowTable from './ui/ShowTable'

import { getPage } from '../actions'

export const Shows = connect(
  (state) => ({
    data: state.data
  }),
  dispatch => ({
    onInit(...args) {
      dispatch(getPage(...args))
    }
  })
)(ShowTable)