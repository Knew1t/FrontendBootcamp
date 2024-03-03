import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as consts from "./consts.js";
import "./App.css";

function ErrorPopup({ setError }) {
  const clickHandler = (ev) => {
    console.log("click");
    ev.preventDefault();
    setError(false);
  };

  return (
    <div onClick={clickHandler} className="errorContainer">
      <div className="errorWindow">
        <div>
          <span className="tex404">
            4
            <img
              className="pokeballSvg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
            />
            4
          </span>
        </div>
        <div className="notFound">POKEMON NOT FOUND</div>
      </div>
    </div>
  );
}
const PokemonCard = memo(
  function PokemonCard({ deleteHandler, name, url, img }) {
    const isLight = useContext(ThemeContext);
    const [form, setForm] = useState("");
    const [formCount, setFormCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    //TODO: add useMemo for this one to avoid rerender i guess because context forces rerender
    const getInfo = (url) => {
      fetch(url, { mode: "cors" }).then((response) => {
        return response.json();
      }).then((
        response,
      ) => {
        setForm(response.forms[0].name);
        setFormCount(response.forms.length);
      }).catch((error) => console.error(error)).finally(() =>
        setLoading(false)
      );
    };
    useEffect(() => {
      getInfo(url);
    }, []);
    console.log(`${name} render at ${new Date().toLocaleTimeString()}`);

    const hoverHandler = (ev) => {
      ev.stopPropagation();
      setHover(!hover);
    };

    return (
      <>
        <div
          onMouseEnter={hoverHandler}
          onMouseLeave={hoverHandler}
          className="cardOverlay"
        >
          {hover &&
            (
              <button
                onClick={deleteHandler}
                className="button-delete-card"
              >
                X
              </button>
            )}
          <div
            style={{
              display: "inline-block",
              backgroundImage: `url(${img})`,
              backgroundSize: "100%",
            }}
            className="card"
          >
            {!loading
              ? (
                <div
                  style={{ color: (isLight == true) ? "black" : "white" }}
                >
                  <div className="card-info">
                    {name + " "}
                    <div style={{ display: "inline-block" }} className="forms">
                      {`${form + " "}`}
                    </div>
                  </div>
                  <div className="amount">
                    {`${formCount}`}
                  </div>
                </div>
              )
              : "loading..."}
          </div>
        </div>
      </>
    );
  },
  (prev, curr) => {
    return prev.name === curr.name && prev.url === curr.url &&
      prev.deleteHandler.name === curr.deleteHandler.name;
  },
);

function PokemonCardArray({ array, setPokemonArray, setCount }) {
  const deleteElementHandler = (item) => {
    function deleteHandler() {
      // filters out element which has same id as clicked one
      // console.log(item.id);
      if (array.length === 1) setCount(19);
      setPokemonArray((array) => array.filter((elem) => elem.id !== item.id));
      // console.log(pokemonArray.filter((elem) => elem.id !== item.id));
    }
    return deleteHandler;
  };
  return (
    <div className="cardArray">
      {array.map((item) => {
        return (
          <PokemonCard
            deleteHandler={deleteElementHandler(item)}
            key={item.id}
            name={item.info.name.charAt(0).toUpperCase() +
              item.info.name.slice(1)}
            url={item.url}
            img={item.img}
          />
        );
      })}
    </div>
  );
}
const ThemeContext = createContext(true);
function App() {
  const [isLight, setTheme] = useState(true);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(19);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("app mounting");
    const storageArray = localStorage.getItem("initial_list");
    console.log(typeof storageArray);
    if (storageArray === null) {
      getData();
    } else {
      setPokemonArray(JSON.parse(storageArray));
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
          setPokemonArray(
            newArr,
          );
        } else {
          const newElem = {
            "id": count + 1,
            "info": response,
            "url": `${consts.POKEMON_API_URL}${response.id}`,
            "img": `${consts.POKEMON_API_IMAGE_URL}${response.id}.png`,
          };
          setCount(count + 1);
          setPokemonArray([newElem, ...pokemonArray]);
        }
      }).catch((error) => {
        if (error.cause === 404) {
          setError(true);
        }
      });
  }

  return (
    <>
      <ThemeContext.Provider value={isLight}>
        <div className={isLight == true ? "light" : "dark"}>
          {error && <ErrorPopup setError={setError} />}
          <form onSubmit={getData} style={{ display: "inline-block" }}>
            <input
              onInput={(ev) => setSearchText(ev.target.value)}
              type="search"
              value={searchText}
            />
            <input type="submit" onSubmit={getData} value="Find" />
          </form>
          <button
            onClick={() => {
              setError(false);
              setPokemonArray([]);
            }}
          >
            Clear List
          </button>
          {isLight == true ? "light" : "dark"}
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setTheme((isLight) => !isLight)}
            />
            <span className="slider"></span>
          </label>
          <PokemonCardArray
            array={pokemonArray}
            setPokemonArray={setPokemonArray}
            setCount={setCount}
          />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
