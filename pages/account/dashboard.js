import Head from '../../components/Head';
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import DashSect from "../../components/account/DashSect";


export default function Dashboard() {
	const pg = 'Dashboard';
	return (
		<>
			<Head currentPage={pg} />
			<Header />
			<Navigation page={pg.toLowerCase()}/>
			<DashSect page={pg}/>
		</>
	)
}