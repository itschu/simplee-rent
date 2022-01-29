import Head from "../components/Head/";
import Footer from "../components/home/Footer";
import SignUp from "../components/home/SignUp";

const signup = () => {
	return (
		<>
			<Head currentPage="Sign Up" />
			<SignUp />
			<Footer />
		</>
	);
};

export default signup;
