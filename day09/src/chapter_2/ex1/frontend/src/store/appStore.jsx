import { createStore } from "redux";

const baseState = {};

function appReducer(state = baseState, action) {
  switch (action.type) {
    case "":
      break;

    default:
      return state;
  }
}

const appStore = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
