import Head from "../../../components/Head";
import Header from "../../../components/account/Header";
import { MenuState } from "../../../context";
import { useRouter } from "next/router";
import Footer from "../../../components/home/Footer";
import AddToCalendar from "../../../components/BookShowing/calendar";

const Calendar = ({ availability, showing, property }) => {
	const pg = "Add To Calendar";
	const router = useRouter();
	let { email } = router.query;

	return (
		<MenuState>
			<Head currentPage={`${email || ""} ${pg}`} />
			<Header userAvatar={""} noProfile={false} />
			<AddToCalendar
				info={availability}
				showingInfo={showing}
				property={property}
			/>
			<Footer />
		</MenuState>
	);
};

export default Calendar;

export const getServerSideProps = async (context) => {
	const res = await fetch(`${process.env.URL}api/availability`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const showing_res = await fetch(
		`${process.env.URL}api/showing/${context.query.showingId}`,
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

	const thisAvailability = data.filter((el) => el.id == context.query.id);	

	const prop = await fetch(`${process.env.URL}api/properties/`, {
		method: "Get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const thisProp = await prop.json();
	// console.log(context.query.showingId);

	const thisProp_addr = thisProp.data.filter(
		(el) =>
			el.owner == context.query.owner &&
			el.unique == thisAvailability[0].unique
	);

	return {
		props: {
			availability: thisAvailability,
			showing: [showing_data.data],
			property: thisProp_addr,
		},
	};
};
