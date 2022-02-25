import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import {
	MenuState,
	useShowingsContext,
	useAvailabilityContext,
} from "../../context";
import ShowingSect from "../../components/account/ShowingSect";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { formatDate } from "../../data";

export default function Showings({ data, availability, showing }) {
	const { user } = data;
	const { setShowings } = useShowingsContext();
	const { setAvailability } = useAvailabilityContext();
	const pg = "Showings";

	const userShowings = showing.filter(
		(el) =>
			el.owner == user.email &&
			formatDate(el.date) >= formatDate(new Date())
	);

	const userAvailability = availability.filter(
		(el) => el.owner == user.email
	);

	useEffect(() => {
		setAvailability(userAvailability);
		setShowings(userShowings);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header userAvatar={user.image} />
			<Navigation page={pg.toLowerCase()} />
			<ShowingSect page={pg} />
		</MenuState>
	);
}

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

	const avail_data = await resAvail.json();
	const show_data = await resShow.json();

	return {
		props: {
			data: session,
			availability: avail_data.data,
			showing: show_data.data,
		},
	};
};
