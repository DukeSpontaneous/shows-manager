import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

const storeFactory = (initialState = {}) =>
    applyMiddleware(...middleware)(createStore)(
        reducers,
        initialState
    )

export default storeFactory