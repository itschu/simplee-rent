import Head from "../components/Head/";
import Footer from "../components/home/Footer";
import SignUp from "../components/home/SignUp";
import { getSession, useSession } from "next-auth/react";

const Signup = () => {
	const {data: session} = useSession();
	if(session){
		console.log(true);
		window.open('/account', '_self');
	}
	return (
		<>
			<Head currentPage="Sign Up" />
			<SignUp />
			<Footer />
		</>
	);
};

export default Signup;

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: "/account/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
