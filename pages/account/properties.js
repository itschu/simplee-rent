import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import PropSect from "../../components/account/PropSect";
import { getSession } from "next-auth/react";
import { usePropertiesContext } from "../../context";
import { useEffect } from "react";

export default function Properties({ data, properties }) {
	const { user } = data;
	const pg = "Properties";

	const { setAllProps } = usePropertiesContext();
	const userProp = properties.filter((el) => el.owner == user.email);
	useEffect(() => {
		setAllProps(userProp);
	}, []);

	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header userAvatar={user.image} />
			<Navigation page={pg.toLowerCase()} />
			<PropSect page={pg} user={user} />
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
	const res = await fetch(`${process.env.URL}api/properties`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const { data } = await res.json();
	return {
		props: {
			data: session,
			properties: data,
		},
	};
};
