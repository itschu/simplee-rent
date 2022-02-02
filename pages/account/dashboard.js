import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import DashSect from "../../components/account/DashSect";
import { MenuState } from "../../context";
import { getSession } from "next-auth/react";

export default ({ data }) => {
	const { user } = data;
	const pg = "Dashboard";
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
	return {
		props: {
			data: session,
		},
	};
};
