import C from '../../constants.js'
import { combineReducers } from 'redux'
import initialState from '../../initialState.json'

export const jokes = (state = initialState.jokes, action) => {
    switch (action.type) {
        case C.GET_JOKES: {
            return { ...state, fetching: true, fetched: false }
            break
        }
        case C.RECEIVE_JOKES: {
            return { ...state, fetching: false, fetched: true, cards: action.payload, error: null }
            break
        }
        case C.GET_JOKES_ERROR: {
            return { ...state, fetching: false, fetched: true, error: action.payload, cards: null}
            break
        }
        case C.NEXT_PAGE: {
            return { ...state, page: action.payload}
            break
        }
    }
    return state
}

export const favorites = (state = initialState.favorites, action) => {
    switch(action.type){        
        case C.GET_FAV_JOKES: {
            return { ...state }
            break
        }
        case C.SET_FAV_JOKES: {
            return { ...state, cards: action.payload }
            break
        }
    }
    return state
}

export default combineReducers({
    jokes,
    favorites
})