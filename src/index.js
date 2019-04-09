import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//// Redux imports:
// //The Provider is a wrapper component from React Redux that wraps your React app. 
// //This wrapper then allows you to access the Redux store and dispatch functions throughout your component tree. 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

// to enable asynchronous actions on redux store, need to apply redux-thunk middleware
const middleware = [thunk];

const store = createStore(
    rootReducer,
    // compose is used whenever we want to pass multiple store enhancers to the store.
    // Store enhancers are higher order functions that add some extra functionality to the store. 
    compose(
        applyMiddleware(...middleware),
        // this is to enable redux dev tools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

ReactDOM.render(
    //Provider => to provide store to its child component
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
