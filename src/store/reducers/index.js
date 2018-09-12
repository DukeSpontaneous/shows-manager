import { combineReducers } from 'redux'

import poster from './poster'
import shows from './shows'

export default combineReducers({
    shows,
    poster,
})