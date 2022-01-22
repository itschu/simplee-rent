import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import ShowingSect from "../../components/account/ShowingSect";

export default function Showings() {
	const pg = "Showings";
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header />
			<Navigation page={pg.toLowerCase()} />
			<ShowingSect page={pg} />
		</MenuState>
	);
}
