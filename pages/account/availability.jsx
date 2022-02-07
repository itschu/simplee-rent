import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import AvailSect from "../../components/account/AvailSect";
import { getSession } from "next-auth/react";

const Availability = ({ data }) => {
	const { user } = data;
	const pg = "Availability";
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
	return {
		props: {
			data: session,
		},
	};
};
