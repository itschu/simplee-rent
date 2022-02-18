import DashHome from "./dashboard";
import { getSession } from "next-auth/react";

export default DashHome;

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
