import { useState, useRef } from "react";
import { H1, Wrapper } from "../DashSect/style";
import { useShowingsContext, usePropertiesContext } from "../../../context";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "../../../data";

const handleDateClicked = (args) => {
	console.log(args.event);
};

const ShowingSect = ({ page }) => {
	// const [value] = useState(new Date());
	const { showings, setShowings } = useShowingsContext();
	const { allProps } = usePropertiesContext();
	let allShowing = [];
	let itm = "";
	let newShowing = showings.map((el) => {
		if (Array.isArray(el.date)) {
			return (itm = el.date.map((elem) => {
				return {
					groupId: (Math.random() + 1)
						.toString(30)
						.substring(allProps.length + 5),
					title: `${el.property} ${el.duration} mins showing`,
					date: formatDate(elem),
				};
			}));
		} else {
			return {
				title: `${el.property} showing`,
				date: formatDate(el.date),
			};
		}
	});

	if (itm !== "") {
		allShowing = [...itm];
	} else {
		allShowing = [...newShowing];
	}
	const calendarRef = useRef();
	const handleDateClick = (arg) => {};
	const [events, setEvents] = useState(showings);

	return (
		<Wrapper>
			<H1>All {page}. </H1>
			<FullCalendar
				ref={calendarRef}
				plugins={[
					dayGridPlugin,
					interactionPlugin,
					timeGridPlugin,
					listPlugin,
				]}
				initialView="dayGridMonth"
				selectable
				events={events}
				// dateClick={handleDateClick}
				// eventClick={handleDateClicked}
				nowIndicator={true}
				editable={true}
				// height={600}
				validRange={{ start: new Date(), end: "2025-06-01" }}
			/>
		</Wrapper>
	);
};

export default ShowingSect;
