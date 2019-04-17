import { ADD_TODO, COMPLETE_TODO, FETCH_QUOTES, INPUT, CLEAR_INPUT, GET_COORDS, FETCH_WEATHER, FETCH_BG_IMG } from './types';
import axios from 'axios';

// for input field

export const input = (value) => {
    return {
        type: INPUT,
        value
    }
}

export const clearInput = () => {
    return {
        type: CLEAR_INPUT
    }
}


// for to do list 
let id = 0

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        id: id++,
        text // task: task
    }
}

export const completeTodo = (id) => {
    return {
        type: COMPLETE_TODO,
        id
    }
}

// unlike previous action creators that returned an action object that was immediately sent to the reducers,
// an asychronous action is not an object but a function that is immediately invoked.
// normally when action creators returns an object, that object gets passted to reducer.
// however, when action creators returns a function (when fetching API), the redux-thunk middleware will immediately
// invoke that function instead of passing it to the reducer. And this function does not return the action object.
// thus, we have to manually dispatch them = > hence using dispatch({type:xxx}) 
// the upside of manually dispatching is that we can dispatch as many actions as we want even tho it's in 1 action creator.

// for displaying quotes
export const fetchQuotes = () => dispatch => {
    fetch('https://quota.glitch.me/random')
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_QUOTES,
            data
        })
        );
};

// for displaying weather data

export const getCoords = (position) => {
    return {
        type: GET_COORDS,
        position
    }
}

export const fetchWeather = (lat, lon) => dispatch => {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=18ddfe869c3b911b7c40d750199e1da7')
        // fetch('http://api.openweathermap.org/data/2.5/weather?lat=3.1490131999999997&lon=101.588144&appid=18ddfe869c3b911b7c40d750199e1da7')
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_WEATHER,
            data
        })
        );
}

// to fetch background image

export const fetchImage = () => dispatch => {
    const n = Math.floor(Math.random() * 1000)
    const url = 'https://api.pexels.com/v1/curated?per_page=1&page=' + n
    axios({
        method: 'GET',
        url: url,
        headers: {
            "Authorization": '563492ad6f91700001000001266dc01858bb499985e410b7a3e3bae5',
            "Content-Type": 'application/json'
        }
    })
        .then(response => JSON.parse(response.request.response))
        .then(data => dispatch({
            type: FETCH_BG_IMG,
            data
        }))
        .catch(error => {
            console.log("ERROR:", error)
        })
}



