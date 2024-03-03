import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as consts from "./consts.js";
import appStore from "./store.js";

import {
  updateErrorStatus,
  updatePokemonArray,
  updatePokemonCount,
  updateSearchText,
  updateTheme,
} from "./actions/actions.js";
import PokemonCardArray from "./components/PokemonCardArray.jsx";
import ErrorPopup from "./components/ErrorPopup.jsx";
import "./App.css";

function App() {
  const pokemonArray = useSelector((state) => state.pokemonArray);
  const searchText = useSelector((state) => state.searchText);
  const count = useSelector((state) => state.count);
  const error = useSelector((state) => state.error);
  const isLight = useSelector((state) => state.isLight);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("app mounting");
    const storageArray = localStorage.getItem("initial_list");
    console.log(typeof storageArray);
    if (storageArray === null) {
      getData();
    } else {
      dispatch(updatePokemonArray(JSON.parse(storageArray)));
    }
  }, []);

  function getData(event) {
    event?.preventDefault();
    fetch(`${consts.POKEMON_API_URL}${searchText}`, {
      mode: "cors",
    })
      .then((
        response,
      ) => {
        if (response.status === 404) {
          throw new Error("404", { cause: 404 });
        }
        return response.json();
      }).then((response) => {
        if (response?.results != undefined) {
          const newArr = response?.results.map((item, index) => {
            const arr = item.url.split("/");
            const imgId = arr[arr.length - 2];
            const pokemonOjbect = {
              "id": index,
              "info": item,
              "url": item.url,
              "img": `${consts.POKEMON_API_IMAGE_URL}${imgId}.png`,
            };
            return pokemonOjbect;
          });
          localStorage.setItem("initial_list", JSON.stringify(newArr));
          dispatch(updatePokemonArray(
            newArr,
          ));
        } else {
          const newElem = {
            "id": count + 1,
            "info": response,
            "url": `${consts.POKEMON_API_URL}${response.id}`,
            "img": `${consts.POKEMON_API_IMAGE_URL}${response.id}.png`,
          };
          console.log("TRUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
          dispatch(updatePokemonCount(count + 1));
          dispatch(updatePokemonArray([newElem, ...pokemonArray]));
        }
      }).catch((error) => {
        if (error.cause === 404) {
          dispatch(updateErrorStatus(true));
        }
      });
  }

  return (
    <>
      <div className={isLight == true ? "light" : "dark"}>
        {error && <ErrorPopup />}
        <form onSubmit={getData} style={{ display: "inline-block" }}>
          <input
            onInput={(ev) => dispatch(updateSearchText(ev.target.value))}
            type="search"
            value={searchText}
          />
          <input type="submit" onSubmit={getData} value="Find" />
        </form>
        <button
          onClick={() => {
            dispatch(updateErrorStatus(false));
            dispatch(updatePokemonArray([]));
          }}
        >
          Clear List
        </button>
        {isLight == true ? "light" : "dark"}
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => dispatch(updateTheme(!isLight))}
          />
          <span className="slider"></span>
        </label>
        <PokemonCardArray
          array={pokemonArray}
        />
      </div>
    </>
  );
}

export default App;
