import C from '../../constants.js'
import appReducer from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export default (initialState) => {
    return createStore(appReducer, initialState, compose(applyMiddleware(thunk)))
}