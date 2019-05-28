import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    notification: notificationReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
