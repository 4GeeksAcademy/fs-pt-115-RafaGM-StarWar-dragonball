import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { CartasCharacters } from "../components/CartasCharacters.jsx";
import { CartasPlanets } from "../components/CartasPlanets.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<CartasCharacters/>
		</div>
	);
}; 