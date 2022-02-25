import { useRef, useState } from "react";
import { H1, Wrapper } from "../DashSect/style";
import { useShowingsContext, useAvailabilityContext } from "../../../context";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { formatDate, get12hrs } from "../../../data";
import { AddItemOverlay, EditWrapper, CloseBtn } from "../PropSect/style";

export const deleteShowing = async (id) => {
	try {
		const res = await fetch(`/api/showing/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
		}
		return true;
	} catch (error) {
		return false;
	}
};

const ShowingSect = ({ page }) => {
	const { showings } = useShowingsContext();
	const { availability } = useAvailabilityContext();

	const [showInfo, setShowInfo] = useState(false);
	const [showInfoDetails, set_showInfoDetails] = useState(false);

	const newShowing = showings.map((el) => {
		let time = get12hrs(el.time);

		return {
			title: `${el.name}'s showing`,
			start: new Date(`${formatDate(el.date)} ${time}`),
			extendedProps: {
				date: formatDate(el.date),
				id: el.propertyId,
				time: el.time,
				visitor: el.name,
				email: el.email,
				duration: el.duration,
			},
		};
	});
	let DisplayInfo = {
		title: "",
		visitor: "",
		date: "",
		time: "",
		email: "",
		duration: "",
		property_name: "",
	};

	const calendarRef = useRef();

	const currentTime = get12hrs(
		new Date().toLocaleTimeString("en-US", {
			hour: "numeric",
			hour12: true,
			minute: "numeric",
		})
	);

	const currentDate = formatDate(new Date());

	const eventClicked = (arg) => {
		setShowInfo(true);
		console.log(showings, availability);

		const [property] = availability.filter(
			(el) => el.id == arg.event.extendedProps.id
		);
		DisplayInfo = {
			title: arg.event.title,
			visitor: arg.event.extendedProps.visitor,
			date: arg.event.extendedProps.date,
			time: arg.event.extendedProps.time,
			email: arg.event.extendedProps.email,
			duration: arg.event.extendedProps.duration,
			property_name: property.property,
		};
		// console.log(currentDate);
		set_showInfoDetails(DisplayInfo);
	};

	const close = () => {
		setShowInfo(false);
	};

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
				events={newShowing}
				eventClick={eventClicked}
				nowIndicator={true}
				// editable={true}
				height={600}
				validRange={{ start: new Date(), end: "2025-06-01" }}
				eventTimeFormat={{
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}}
			/>
			{showInfo && (
				<AddItemOverlay show={showInfo}>
					<EditWrapper showBlock={true}>
						<CloseBtn onClick={() => close()} />
						<h2>{showInfoDetails.title}</h2>
						<p>
							<b>Visitor</b> : {showInfoDetails.visitor}
						</p>
						<p>
							<b>Email</b> : {showInfoDetails.email}
						</p>
						<p>
							<b>Date</b> : {showInfoDetails.date}
						</p>
						<p>
							<b>Time</b> : {showInfoDetails.time}
						</p>
						<p>
							<b>Duration</b> :&nbsp;
							{showInfoDetails.duration < 60
								? `${showInfoDetails.duration} minutes`
								: showInfoDetails.duration < 120
								? `${showInfoDetails.duration / 60} hour`
								: `${showInfoDetails.duration / 60} hours`}
						</p>
						<p>
							<b>Property</b> : {showInfoDetails.property_name}
						</p>

						{showInfoDetails.duration <= currentDate &&
						get12hrs(showInfoDetails.time) < currentTime ? (
							<div className="ribbon-down">
								<span>Expired</span>
							</div>
						) : (
							<div className="ribbon-down status">
								<span>Upcoming</span>
							</div>
						)}
					</EditWrapper>
				</AddItemOverlay>
			)}
		</Wrapper>
	);
};

export default ShowingSect;
