import { useDispatch, useSelector } from "react-redux";
import { updateTheme } from "../actions/actions.js";
import { memo, useContext, useEffect, useState } from "react";
const PokemonCard = memo(
  function PokemonCard({ deleteHandler, name, url, img }) {
    const isLight = useSelector((state) => state.isLight);
    const [form, setForm] = useState("");
    const [formCount, setFormCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch;
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
                <div style={{ color: isLight ? "black" : "white" }}>
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

export default PokemonCard;
