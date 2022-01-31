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
	return {
		props: {},
	};
};
