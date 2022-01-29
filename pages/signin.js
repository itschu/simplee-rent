import Head from "../components/Head/";
import Footer from "../components/home/Footer";
import SignIn from "../components/home/SignIn";

const signin = () => {
	return (
		<>
			<Head currentPage="Sign In" />
            <SignIn />
			<Footer />
		</>
	);
};

export default signin;
