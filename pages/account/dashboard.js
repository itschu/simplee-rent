import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import DashSect from "../../components/account/DashSect";
import { MenuState } from "../../context";
import { getSession } from "next-auth/react";
import {
	usePropertiesContext,
	useAvailabilityContext,
	useShowingsContext,
} from "../../context";
import { useEffect } from "react";
import { formatDate } from "../../data";

const Dash = ({ data, properties, availability, showing }) => {
	const { user } = data;
	const pg = "Dashboard";

	const { setAllProps } = usePropertiesContext();
	const { setAvailability } = useAvailabilityContext();
	const { setShowings } = useShowingsContext();
	// 0xex5d20
	const userProp = properties.filter((el) => el.owner == user.email);

	const userAvailability = availability.filter(
		(elem) =>
			!userProp.find(({ unique }) => elem.id == unique) &&
			elem.owner == user.email
	);

	const userShowings = showing.filter(
		(elem) =>
			userAvailability.find(({ id }) => elem.propertyId === id) &&
			elem.owner == user.email
	);
	// console.log(userShowings);
	// .filter((el) => formatDate(el.date) >= formatDate(new Date()))
	useEffect(() => {
		setAllProps(userProp);
		setAvailability(userAvailability);
		setShowings(userShowings);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header userAvatar={user.image} />
			<Navigation page={pg.toLowerCase()} />
			<DashSect page={pg} />
		</MenuState>
	);
};

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}
	const res = await fetch(`${process.env.URL}api/properties`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const resAvail = await fetch(`${process.env.URL}api/availability`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const resShow = await fetch(`${process.env.URL}api/showing`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const { data } = await res.json();
	const avail_data = await resAvail.json();
	const show_data = await resShow.json();
	return {
		props: {
			data: session,
			properties: data,
			availability: avail_data.data,
			showing: show_data.data,
		},
	};
};

export default Dash;
