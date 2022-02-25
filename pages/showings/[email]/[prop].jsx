import Head from "../../../components/Head";
import Header from "../../../components/account/Header";
import { MenuState } from "../../../context";
import { useRouter } from "next/router";
import Footer from "../../../components/home/Footer";
import BookShowing from "../../../components/BookShowing/";

const Book = ({ availability }) => {
	const pg = "Book Showing";
	const router = useRouter();

	let { email, prop } = router.query;
	const thisAvailability = availability.filter((el) => el.id == prop);

	return (
		<MenuState>
			<Head currentPage={`${email || ""} ${pg}`} />
			<Header userAvatar={""} noProfile={false} />
			<BookShowing info={thisAvailability} />
			<Footer />
		</MenuState>
	);
};

export default Book;

export const getServerSideProps = async (context) => {
	const res = await fetch(`${process.env.URL}api/availability`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const { data } = await res.json();

	return {
		props: {
			availability: data,
		},
	};
};
