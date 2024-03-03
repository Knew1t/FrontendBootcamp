import appStore from "../store.js";
import { updateErrorStatus } from "../actions/actions.js";
import { useDispatch } from "react-redux";
function ErrorPopup() {
  const dispatch = useDispatch();
  const clickHandler = (ev) => {
    console.log("click");
    ev.preventDefault();
    dispatch(updateErrorStatus(false));
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

export default ErrorPopup;
