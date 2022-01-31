import Head from "../../components/Head";
import Header from "../../components/account/Header";
import Navigation from "../../components/account/Navigation";
import { MenuState } from "../../context";
import PropSect from "../../components/account/PropSect";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Properties() {
	const { data: session } = useSession();

	const pg = "Properties";
	return (
		<MenuState>
			<Head currentPage={pg} />
			<Header />
			<Navigation page={pg.toLowerCase()} />
			<PropSect page={pg} />
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
