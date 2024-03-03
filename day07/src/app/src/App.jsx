import { useEffect, useState } from "react";
import "./App.css";

function PokemonCard({ info, handler }) {
  // useEffect(() => {
  //   // console.log(`MOUNT ${name}`);
  //   console.log(`MOUNT `);
  // }, []);

  const [form, setForm] = useState("");

  function getInfo(url) {
    fetch(url, { mode: "cors" }).then((response) => response.json()).then((
      response,
    ) => {
      console.log(response.forms[0].name);
      setForm(response.forms[0].name);
      return response.forms[0].name;
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getInfo(info.url);
  }, []);

  return (
    <>
      <div style={{ display: "inline-block" }} className="card">
        {info.name + " "}
        <div style={{ display: "inline-block" }} className="forms">
          {form}
        </div>
        <div style={{ display: "inline-block" }} className="amount">
          . number
        </div>
      </div>
      <button onClick={handler}>X</button>
      <br />
    </>
  );
}

function PokemonCardArray({ handler, array }) {
  return array.map((item) => (
    <PokemonCard
      handler={handler(item)}
      key={item.id}
      info={item.info}
    />
  ));
}

// 1. render 20 pokemons with empty request
// 2. re-render on submit or changes to pokemon list
function App() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(19);

  function getData() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`, { mode: "cors" })
      .then((
        response,
      ) => {
        if (response.status === 404) {
          throw new Error("404", { cause: 404 });
        }
        return response.json();
      }).then((response) => {
        if (response?.results != undefined) {
          setPokemonArray(
            response?.results.map((item, index) => {
              return { "id": index, "info": item };
            }),
          );
        } else {
          const newElem = { "id": count + 1, "info": response };
          setCount(count + 1);
          setPokemonArray([newElem, ...pokemonArray]);
        }
      }).catch((error) => {
        if (error.cause === 404) {
          //TODO : сделай нормальное окно при неправильном вводе
          alert("wrong pokemon");
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteElementHandler = (item) => () => {
    // filters out element which has same name as clicked one
    if (pokemonArray.length === 1) setCount(19);
    setPokemonArray(pokemonArray.filter((elem) => elem.id !== item.id));
  };

  return (
    <>
      <input onInput={(ev) => setSearchText(ev.target.value)} type="text" />
      <button onClick={getData}>Search</button>
      <button onClick={() => setPokemonArray([])}>Clear List</button>
      <br />
      <PokemonCardArray handler={deleteElementHandler} array={pokemonArray} />
    </>
  );
}

export default App;
