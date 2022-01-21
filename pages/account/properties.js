import Head from '../../components/Head';
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import {MenuState} from '../../context';
import PropSect from '../../components/account/PropSect';

export default function Properties() {
	const pg = 'Properties';
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header />
			<Navigation page={pg.toLowerCase()} />
			<PropSect page={pg} />
		</MenuState>
	)
};  