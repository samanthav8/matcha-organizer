// src/store.js
//import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//func taking object where keys represent slice of our global state
//with values and reducer function
const rootReducer = combineReducers({
});

//holds state of the app. created by passing the root reducer which is
//all of our reducers
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

export default store;
