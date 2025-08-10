import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const handleSearch = (e) => {
		dispatch({
			type: "set_searchTerm",
			payload: e.target.value.toLowerCase()
		});
	};

	const handleRemoveFavorite = (fav) => {
		const newFavorites = store.favorite.filter(
			(item) => !(item.id === fav.id && item.type === fav.type)
		);
		dispatch({ type: "set_favorite", payload: newFavorites });
	};

	return (
		<nav className="d-flex navbar-light bg-info-subtle justify-content-between">
			{/* enlaces a páginas */}
			<div className="p-2">
				<div>
					<Link to="/">
						<span className="navbar-brand mb-0 h1">Personajes</span>
					</Link>
					<div></div>
					<Link to="/demo">
						<span className="navbar-brand mb-0 h1">Planetas</span>
					</Link>
				</div>
			</div>
			<div className="p-2">
				<label htmlFor="buscador">
					<i className="fa-solid fa-magnifying-glass"> Buscador </i>
				</label>
				<input type="text" name="buscador" id="buscador" value={store.searchTerm} onChange={handleSearch} />
			</div>
			<div className="dropdown p-2">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Favoritos{" "}
					<span className="badge bg-dark ms-1">{store.favorite.length}</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-end">
					{store.favorite.length === 0 ? (
						<li className="dropdown-item text-secondary">(Vacío)</li>
					) : (
						store.favorite.map((fav, index) => (
							<li
								key={index}
								className="dropdown-item d-flex justify-content-between align-items-center"
							>
								<span>
									{fav.name}{" "}
									<small className="text-muted">
										[{fav.type === "planet" ? "planeta" : "personaje"}]
									</small>
								</span>
								<button
									className="btn btn-sm btn-danger"
									onClick={() => handleRemoveFavorite(fav)}
								>
									x
								</button>
							</li>
						))
					)}
				</ul>
			</div>
		</nav>
	);
};
