import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  // add reducer here
  user: userReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
