import C from '../../constants.js'
import axios from 'axios'
import store from '../store'

// Jokes
export function getJokes() {
    return {
        type: C.GET_JOKES
    }
}

export function receiveJokes(jokes) {
    return {
        type: C.RECEIVE_JOKES,
        payload: jokes.results
    }
}

export function receiveJokesError(err) {
    return {
        type: C.GET_JOKES_ERROR,
        payload: err
    }
}

export function getJokesFromApi(page) {

    return function action(dispatch) {
        dispatch(getJokes())

        var headers = {
            Accept: 'application/json'
        }

        var url = `https://icanhazdadjoke.com/search?page=${page}`

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(receiveJokes(items)))
            .catch((error) => dispatch(receiveJokesError(error)));
    };
}

export function incrementPage(page) {
    return function action(dispatch) {
        page = store.getState().jokes.page
        page += 1
        dispatch(nextPage(page))
        dispatch(getJokesFromApi(page))
    }
}

function nextPage(page) {
    return {
        type: C.NEXT_PAGE,
        payload: page
    }
}

// Favorites
export function getFavJokes() {
    return {
        type: C.GET_FAV_JOKES
    }
}

export function setFavJoke(joke) {
    return {
        type: C.SET_FAV_JOKES,
        payload: joke
    }
}