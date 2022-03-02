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
				phone_number: el.phone_number,
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
		phone_number: "",
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
			property_name: property?.property,
			phone_number: arg.event.extendedProps.phone_number,
		};
		set_showInfoDetails(DisplayInfo);
		setShowInfo(true);
	};

	const close = () => {
		setShowInfo(false);
	};

	return (
		<Wrapper>
			<H1>{page} </H1>
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
							<b>Phone</b> : {showInfoDetails.phone_number}
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

						{showInfoDetails.date <= currentDate &&
						get12hrs(showInfoDetails.time) < currentTime ? (
							<div className="ribbon-down">
								<span>Expired</span>
							</div>
						) : (
							<div className="ribbon-down status">
								<span>Upcoming</span>
							</div>
						)}
						{/* {console.log(get12hrs(showInfoDetails.time), currentTime)} */}
					</EditWrapper>
				</AddItemOverlay>
			)}
		</Wrapper>
	);
};

export default ShowingSect;
