import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import AvailSect from "../../components/account/AvailSect";
import { getSession } from "next-auth/react";
import { usePropertiesContext, useAvailabilityContext } from "../../context";
import { useEffect } from "react";

const Availability = ({ data, properties, availability }) => {
	const { user } = data;
	const pg = "Availability";

	const { setAllProps } = usePropertiesContext();
	const { setAvailability } = useAvailabilityContext();
	const userProp = properties.filter((el) => el.owner == user.email);
	const userAvailability = availability.filter(
		(el) => el.owner == user.email
	);

	useEffect(() => {
		setAllProps(userProp);
		setAvailability(userAvailability);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header userAvatar={user.image} />
			<Navigation page={pg.toLowerCase()} />
			<AvailSect page={pg} session={user} />
		</MenuState>
	);
};

export default Availability;

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

	const { data } = await res.json();
	const avail_data = await resAvail.json();

	return {
		props: {
			data: session,
			properties: data,
			availability: avail_data.data,
		},
	};
};
