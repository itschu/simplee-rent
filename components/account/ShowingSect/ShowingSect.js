import { useState, useEffect, useRef } from "react";
import { H1, Wrapper } from "../DashSect/style";
import { AddProp } from "../PropSect/style";
import {
	Container,
	Data,
	ActionBtns,
	HData,
	BtnWrapper,
	Notification,
} from "./style";
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
import listPlugin from '@fullcalendar/list';

const convertDate = (inputFormat) => {
	function pad(s) {
		return s < 10 ? "0" + s : s;
	}
	var d = new Date(inputFormat);
	return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate()), ].join("-");
}

const handleDateClicked = (args) => {
	console.log(args.event.title);
}

const ShowingSect = ({ page }) => {
	const [value] = useState(new Date());
	const [events, setEvents] = useState([
		{ title: "event 1", date: "2022-02-01" },
		{ title: "event 2", date: "2022-02-02" },
	]);

	const calendarRef = useRef();
	let newArr = [];
	const handleDateClick = (arg) => {
		if (Array.isArray(value)) {
			value.map((el, i) => {
				let it = { title: `event ${i + 10}`, date: convertDate(new Date(el)) };
				newArr.push(it);
			});
			// setEvents([...events, ...newArr]);
		} else {
			let it = { title: `event ${101}`, date: convertDate(new Date(value)) };
			// setEvents([...events, it]);
		}
	};



	const [showOverlay, setShowOverlay] = useState(false);
	const [displayNotify, setDisplayNotify] = useState(false);
	const { showings, setShowings } = useShowingsContext();
	const { allProps } = usePropertiesContext();

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

	useEffect(() => {
		showings.map(() => {});
		setTimeout(() => {
			setDisplayNotify(false);
		}, 1500);
	});
	return (
		<Wrapper>
			<H1>All {page}. </H1>
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]}
				initialView="dayGridMonth"
				editable
				selectable
				events={events}
				dateClick={handleDateClick}
				eventClick={handleDateClicked}
				nowIndicator={true}
				editable={true}
				height={450}
				validRange={{start: new Date(), end: '2025-06-01'}}
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
			/>
		</Wrapper>
	);
};

export default ShowingSect;
