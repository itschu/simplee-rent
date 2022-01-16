import Head from '../../components/Head';
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";


export default function Showings() {
	return (
		<>
			<Head currentPage="Showings" />
			<Header />
			<Navigation page="showings"/>
		</>
	)
}