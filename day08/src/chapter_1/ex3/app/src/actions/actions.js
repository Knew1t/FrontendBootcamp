function removeFromPokemonArray(item) {
  return {
    type: "pokemonArray/deleteItem",
    value: item,
  };
}
function updatePokemonArray(array) {
  return {
    type: "pokemonArray/update",
    value: array,
  };
}

function updateSearchText(str) {
  return {
    type: "searchText/update",
    value: str,
  };
}

function updateErrorStatus(status) {
  return {
    type: "errorPopup/update",
    value: status,
  };
}
function updatePokemonCount(count) {
  return {
    type: "arrayCount/update",
    value: count,
  };
}

function updateTheme(isLight) {
  return {
    type: "theme/updateTheme",
    value: isLight,
  };
}
export {
  updateErrorStatus,
  updatePokemonArray,
  updatePokemonCount,
  updateSearchText,
  updateTheme,
  removeFromPokemonArray,
};
