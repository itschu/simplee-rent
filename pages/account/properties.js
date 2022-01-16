import Head from '../../components/Head';
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";


export default function Properties() {
	return (
		<>
			<Head currentPage="Properties" />
			<Header />
			<Navigation page="properties"/>

		</>
	)
}