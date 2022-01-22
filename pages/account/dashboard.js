import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import DashSect from "../../components/account/DashSect";
import { MenuState } from "../../context";

export default function Dashboard() {
	const pg = "Dashboard";
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header />
			<Navigation page={pg.toLowerCase()} />
			<DashSect page={pg} />
		</MenuState>
	);
}
