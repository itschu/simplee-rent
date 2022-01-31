import Head from "../components/Head/";
import Footer from "../components/home/Footer";
import SignIn from "../components/home/SignIn";
import { getSession, useSession } from "next-auth/react";

const signin = () => {
	const {data: session} = useSession();
	if(session){
		console.log(true);
		window.open('/account', '_self');
	}
	return (
		<>
			<Head currentPage="Sign In" />
            <SignIn />
			<Footer />
		</>
	);
};

export default signin;

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