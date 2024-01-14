import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

const rootReducer = combineReducers({
  // add reducer here
  user: userReducer,
  posts: postReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
