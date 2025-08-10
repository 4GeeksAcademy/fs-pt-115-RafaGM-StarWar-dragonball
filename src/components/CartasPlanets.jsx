import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getplanets } from "../services/servicesApi";

export const CartasPlanets = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getplanets(dispatch);
  }, []);

  const handleAddFavorite = (item) => {
    const exists = store.favorite.some(
      (fav) => fav.id === item.id && fav.type === "planet"
    );
    if (!exists) {
      dispatch({
        type: "set_favorite",
        payload: [...store.favorite, { ...item, type: "planet" }],
      });
    }
  };

  const filteredPlanets = store.planets.filter((item) =>
    item.name.toLowerCase().includes(store.searchTerm)
  );

  return (
    <div className="container">
      <div className="row">
        {filteredPlanets.map((item) => (
          <div
            className="card col-2 m-2 bg-warning"
            style={{ width: "15rem" }}
            key={item.id}
          >
            <img
              src={item.image}
              className="m-auto p-1"
              alt={item.name}
              style={{ width: "10rem", height: "10rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
            <div className="card-body d-flex justify-content-between">
              <Link to={`/single/${item.id}`} state={{ type: "planet" }}>
                <button className="btn btn-warning btn-details">Detalles</button>
              </Link>
              <button
                className="btn btn-heart"
                onClick={() => handleAddFavorite(item)}
              >
                ❤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
