// src/store.js
import { createStore, combineReducers } from "redux";

//function taking current state and action and returns the new state
const userReducer = (state = null, action) => {
  switch (action.type) {
    //updates state w/ user data
    case "SET_USER":
      return action.payload;
    //logs out user
    case "LOGOUT_USER":
      return null;
    //returns state unchanged
    default:
      return state;
  }
};

//func taking object where keys represent slice of our global state
//with values and reducer function
const rootReducer = combineReducers({
  user: userReducer,
});

//holds state of the app. created by passing the root reducer which is
//all of our reducers
const store = createStore(
  rootReducer,
);

export default store;
