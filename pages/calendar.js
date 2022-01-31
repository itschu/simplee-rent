import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

const convertDate = (inputFormat) => {
	function pad(s) {
		return s < 10 ? "0" + s : s;
	}
	var d = new Date(inputFormat);
	return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate()), ].join("-");
}

const Calendar = () => {
	const [value, setValue] = useState(new Date());
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
			setEvents([...events, ...newArr]);
		} else {
			let it = { title: `event ${101}`, date: convertDate(new Date(value)) };
            console.log( convertDate(new Date(value)));
			setEvents([...events, it]);
		}
	};
	return (
		<>
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				initialView="dayGridMonth"
				editable
				selectable
				events={events}
				dateClick={handleDateClick}
				nowIndicator={true}
				editable={true}
			/>
			<DatePicker
				value={value}
				onChange={setValue}
				multiple={true}
				format="YYYY-MM-DD"
			/>
			;
		</>
	);
};

export default Calendar;
