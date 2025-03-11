// src/store.js
//import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




// initial state for user
const initialUserState = {
  user: null,         
  userDetails: null,
};

//function taking current state and action and returns the new state
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    //updates state w/ user name and pw
    case "SET_USER":
      return { ...state, user: action.payload };
    // set full user details
    case "SET_USER_DETAILS":
      return { ...state, userDetails: action.payload };
    //logs out user
    case "LOGOUT_USER":
      return initialUserState;
    //return
    default:
      return state;
  }
};

//func taking object where keys represent slice of our global state
//with values and reducer function
const rootReducer = combineReducers({
  userData: userReducer,
});

//holds state of the app. created by passing the root reducer which is
//all of our reducers
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

export default store;
