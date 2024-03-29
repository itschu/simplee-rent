import Head from "../../../components/Head";
import Header from "../../../components/account/Header";
import { MenuState } from "../../../context";
import { useRouter } from "next/router";
import Footer from "../../../components/home/Footer";
import BookShowing from "../../../components/BookShowing/";
import { formatDate } from "../../../data";
const Book = ({ availability, showing, property }) => {
	const pg = "Book Showing";
	const router = useRouter();

	let { email } = router.query;
	const bookedShowing = showing.map((el) => ({
		time: el.time,
		date: formatDate(el.date),
	}));
	return (
		<MenuState>
			<Head currentPage={`${email || ""} ${pg}`} />
			<Header userAvatar={""} noProfile={false} />
			<BookShowing
				info={availability}
				bookedShowing={bookedShowing}
				property={property}
			/>
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

	const showing_res = await fetch(
		`${process.env.URL}api/showing/${context.query.prop}`,
		{
			method: "Get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
	);

	const { data } = await res.json();
	const showing_data = await showing_res.json();
	const thisAvailability = data.filter((el) => el.id == context.query.prop);

	const prop = await fetch(`${process.env.URL}api/properties/`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const thisProp = await prop.json();
	const thisProp_addr = thisProp.data.filter(
		(el) => el.unique == thisAvailability[0]?.unique
	);

	return {
		props: {
			availability: thisAvailability,
			showing: showing_data.data || [],
			property: thisProp_addr,
		},
	};
};
