import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import ShowingSect from "../../components/account/ShowingSect";
import { getSession, useSession } from "next-auth/react";

export default function Showings() {
	const { data: session } = useSession();

	const pg = "Showings";
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header />
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
	return {
		props: {},
	};
};
