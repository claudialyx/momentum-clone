import { combineReducers } from 'redux';
import { INPUT, ADD_TODO, COMPLETE_TODO, FETCH_QUOTES, CLEAR_INPUT, GET_COORDS, FETCH_WEATHER, FETCH_BG_IMG } from './types';


const defaultState = [];

//due to nature of input field, we do not need to keep the data of the states after submitting, 
//hence, unlike other reducers, return will mutate the states entirely.
const inputReducer = (state = "", action) => {
    switch (action.type) {
        case INPUT:
            return action.value;
        case CLEAR_INPUT:
            return "";
        default:
            return state;
    }
}

const todolistReducer = (state = defaultState, action) => {
    // console.log('reducer', action)
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: action.id, text: action.text, completed: false }];
        case COMPLETE_TODO:
            // console.log('state', state.id) // returns undefined, have to map to get the id 
            // will return a new state with the specific checkboxes's completed status turned true
            return (state.map(todo => (todo.id === action.id) ? { id: todo.id, text: todo.text, completed: !todo.completed } : todo))
        // .map() does not mutate the original array, so don't have to do this:
        // const clone = [...state]
        // return (clone.map(todo => (todo.id == action.id) ? { id: todo.id, text: todo.text, completed: !todo.completed } : todo))
        default:
            return state;
    }
}

const displayQuoteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_QUOTES:
            // console.log([...defaultState, { quote: action.data.quoteText, author: action.data.quoteAuthor }])
            return [...defaultState, { quote: action.data.quoteText, author: action.data.quoteAuthor }];
        default:
            return state;
    }
}

const coordinateReducer = (state = [], action) => {
    switch (action.type) {
        case GET_COORDS:
            // console.log(action.position)
            // console.log([...state, { lat: action.position.coords.latitude, lon: action.position.coords.longitude }])
            return [...state, { lat: action.position.coords.latitude, lon: action.position.coords.longitude }];
        default:
            return state;
    }
}

const weatherReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_WEATHER:
            // console.log(action.data)
            // console.log([...state, { city: action.data.name, weather: action.data.weather, temp: action.data.main }])
            return [...state, { city: action.data.name, weather: action.data.weather, temp: action.data.main }];
        default:
            return state;
    }
}

const fetchImageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BG_IMG:
            console.log([...state, { img_data: action.data.photos }])
            return [...state, { img_data: action.data.photos }]
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    todolist: todolistReducer,
    displayQuote: displayQuoteReducer,
    input: inputReducer,
    coord: coordinateReducer,
    weather: weatherReducer,
    bgImage: fetchImageReducer
})

export default rootReducer;
