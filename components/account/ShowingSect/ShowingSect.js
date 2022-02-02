import { useState, useEffect, useRef } from "react";
import { H1, Wrapper } from "../DashSect/style";
import { AddProp } from "../PropSect/style";
import { Notification } from "./style";
import Image from "next/image";
import addImg from "../../../public/images/add.png";
import copy from "../../../public/images/copy.png";
import edit from "../../../public/images/edit.png";
import del from "../../../public/images/delete.png";
import { useShowingsContext, usePropertiesContext } from "../../../context";
import ShowingModal from "./ShowingModal";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { formatDate, convertDate } from "../../../data";

const handleDateClicked = (args) => {
	console.log(args.event);
};

const ShowingSect = ({ page }) => {
	// const [value] = useState(new Date());
	const [currentModal, setCurrentModal] = useState([]);
	const [showOverlay, setShowOverlay] = useState(false);
	const [displayNotify, setDisplayNotify] = useState(false);
	const { showings, setShowings } = useShowingsContext();
	const { allProps } = usePropertiesContext();

	let itm = "";
	let allShowing = [];
	let newShowing = showings.map((el) => {
		if (Array.isArray(el.date)) {
			return (itm = el.date.map((elem) => {
				return {
					groupId: (Math.random() + 1)
						.toString(60)
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

	const [events, setEvents] = useState(allShowing);

	const calendarRef = useRef();
	const handleDateClick = (arg) => {};

	const copyText = (value) => {
		navigator.clipboard.writeText(value);
		setDisplayNotify(!displayNotify);
	};

	const delItem = (id) => {
		const list = showings.filter((el) => el.id !== id);
		setShowings([...list]);
	};

	const closeOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	const openModal = () => {
		if (allProps.length < 1) {
			alert("Please add a property before creating a showing");
		} else {
			setShowOverlay(!showOverlay);
		}
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
				editable
				selectable
				events={events}
				// dateClick={handleDateClick}
				// eventClick={handleDateClicked}
				nowIndicator={true}
				editable={true}
				height={450}
				validRange={{ start: new Date(), end: "2025-06-01" }}
			/>

			<AddProp>
				<Image
					src={addImg}
					alt="add more properties"
					onClick={openModal}
				/>
			</AddProp>

			{displayNotify && (
				<Notification>
					<b>Link has been copied to clipboard.</b>
				</Notification>
			)}

			<ShowingModal
				displayOverlay={showOverlay}
				close={closeOverlay}
				allProps={allProps}
				list={showings}
				editList={setShowings}
				curr={currentModal}
				setCurr={setCurrentModal}
				chngEvnt={setEvents}
			/>
		</Wrapper>
	);
};

export default ShowingSect;
