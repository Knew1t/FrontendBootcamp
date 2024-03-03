import PokemonCard from "./PokemonCard.jsx";
import { useDispatch } from "react-redux";
import {
  removeFromPokemonArray,
  updatePokemonCount,
} from "../actions/actions.js";
function PokemonCardArray({ array }) {
  const dispatch = useDispatch();
  const deleteElementHandler = (item) => {
    function deleteHandler() {
      if (array.length === 1) dispatch(updatePokemonCount(19));
      dispatch(removeFromPokemonArray(item));
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

export default PokemonCardArray;
