import { createStore, combineReducers, applyMiddleware } from 'redux'
import { shows } from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

const storeFactory = (initialState = {}) =>
    applyMiddleware(...middleware)(createStore)(
        combineReducers({ shows }),
        initialState
    )

export default storeFactory