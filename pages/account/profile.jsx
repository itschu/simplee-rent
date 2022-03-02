import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import Profile from "../../components/account/Profile";
import { MenuState } from "../../context";
import { getSession } from "next-auth/react";

const Dash = ({ data }) => {
	const { user } = data;
	const pg = "My Profile";

	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header userAvatar={user.image} />
			<Navigation page={pg.toLowerCase()} />
			<Profile page={pg} />
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
	return {
		props: {
			data: session,
		},
	};
};

export default Dash;
