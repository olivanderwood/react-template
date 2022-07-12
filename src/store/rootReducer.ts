import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter/slice";
import authenicationReducer from "./authentication/slice";
const rootReducer = combineReducers({
  counter: counterReducer,
  authenication: authenicationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
