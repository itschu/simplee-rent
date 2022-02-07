import Head from "../../../components/Head";
import Header from "../../../components/account/Header";
import { MenuState } from "../../../context";
import { useRouter } from "next/router";
import Footer from "../../../components/home/Footer";
import BookShowing from "../../../components/BookShowing/";

const Book = () => {
	const pg = "Book Showing";
	const router = useRouter();
	let { email } = router.query;
	return (
		<MenuState>
			<Head currentPage={`${email} - ${pg}`} />
			<Header userAvatar={""} noProfile={false} />
			<BookShowing />
			<Footer />
		</MenuState>
	);
};

export default Book;
