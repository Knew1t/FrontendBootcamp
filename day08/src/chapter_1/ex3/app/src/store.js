import { createStore } from "redux";

const baseAppState = {
  pokemonArray: [],
  searchText: "",
  count: 19,
  error: false,
  isLight: true,
};

function appReducer(state = baseAppState, action) {
  switch (action.type) {
    case "pokemonArray/update":
      return {
        ...state,
        pokemonArray: action.value,
      };
    case "searchText/update":
      return {
        ...state,
        searchText: action.value,
      };

    case "errorPopup/update":
      return {
        ...state,
        error: action.value,
      };
    case "arrayCount/update":
      return {
        ...state,
        count: action.value,
      };
    case "theme/updateTheme":
      return {
        ...state,
        isLight: action.value,
      };
    case "pokemonArray/deleteItem": {
      const filteredArray = state.pokemonArray.filter((elem) =>
        elem.id !== action.value.id
      );
      return {
        ...state,
        pokemonArray: filteredArray,
      };
    }

    default:
      return state;
  }
}

const appStore = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default appStore;
