import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { loadState, saveState } from "../localStorage";
import { throttle } from "lodash";

const persistedState = loadState();

/**
 * Configures the redux store
 */
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

/**
 * Saves the state to local storage to prevent it from being set to initial state in every refresh
 */
store.subscribe(throttle(() => {
  saveState({
    users: store.getState().users
  });
}, 1000));

export default store;