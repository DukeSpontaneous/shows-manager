import { createStore, combineReducers, applyMiddleware } from 'redux'
import { data } from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

const storeFactory = (initialState = {}) =>
    applyMiddleware(...middleware)(createStore)(
        combineReducers({ data }),
        initialState
    )

export default storeFactory