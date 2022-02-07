import { useEffect } from "react";
import { Wrapper, Nav, Separate, Input } from "./style";
// import { useEffect } from "react";

export const formatTime = (time) => {
	if (time < 10) {
		time = "0" + time;
	}
	return time;
};

const TimePicker = ({
	hr,
	min,
	stateFn,
	state,
	hour,
	minute,
	id,
	fn,
	types,
}) => {
	// useEffect(() => {
	// 	fn(id, state);
	// }, [hr, min]);

	const set = () => {
		stateFn({
			...state,
			[types]: {
				firstHr: formatTime(hour),
				firstMin: formatTime(minute),
			},
		});
	};

	const setTime = (type) => {
		hour = parseInt(hour);
		minute = parseInt(minute);
		switch (type) {
			case "hr-up":
				hour += 1;
				hour > 23 ? (hour = 0) : null;
				set();
				break;
			case "hr-down":
				hour -= 1;
				hour < 0 ? (hour = 23) : null;
				set();
				break;
			case "min-up":
				minute += 1;
				if (minute > 59) {
					minute = 0;
					setTime("hr-up");
				}
				set();
				break;
			case "min-down":
				minute -= 1;
				if (minute < 0) {
					minute = 59;
					setTime("hr-down");
				}
				set();
				break;
		}
	};

	const time_change = (e, type) => {
		hour = parseInt(hour);
		minute = parseInt(minute);

		if (type == "min-change") {
			let changed = false;
			if (parseInt(e.target.value) > 59) {
				minute = 59;
			} else if (parseInt(e.target.value) <= 0) {
				minute = "00";
			} else {
				minute = e.target.value;
				if (minute.length > 2) {
					let s = minute;
					while (s.charAt(0) === "0") {
						s = s.substring(1);
					}
					changed = true;
					stateFn({
						...state,
						[types]: { firstHr: hour, firstMin: formatTime(s) },
					});
					// setMin(formatTime(s));
				}
			}

			if (e.target.value == "" || minute == "00") {
				minute = "00";
				stateFn({
					...state,
					[types]: { firstHr: hour, firstMin: minute },
				});
				// setMin(minute);
			} else {
				changed ||
					stateFn({
						...state,
						[types]: {
							firstHr: hour,
							firstMin: formatTime(parseInt(minute)),
						},
					});
				// changed || setMin(formatTime(parseInt(minute)));
			}
		}

		if (type == "hr-change") {
			let changed = false;
			if (parseInt(e.target.value) > 23) {
				hour = 23;
			} else if (parseInt(e.target.value) <= 0) {
				hour = "00";
			} else {
				hour = e.target.value;
				if (hour.length > 2) {
					let s = hour;
					while (s.charAt(0) === "0") {
						s = s.substring(1);
					}
					changed = true;
					stateFn({
						...state,
						[types]: { firstHr: formatTime(s), firstMin: minute },
					});
					// setHr(formatTime(s));
				}
			}

			if (e.target.value == "" || hour == "00") {
				hour = "00";
				stateFn({
					...state,
					[types]: { firstHr: hour, firstMin: minute },
				});
				// setHr(hour);
			} else {
				changed ||
					stateFn({
						...state,
						[types]: {
							firstHr: formatTime(parseInt(hour)),
							firstMin: minute,
						},
					});
			}
		}
	};
	return (
		<Wrapper>
			<div>
				{/* <Nav go={"up"} onClick={() => setTime("hr-up")} /> */}
				<Input
					type={"number"}
					value={hr}
					onChange={(e) => {
						time_change(e, "hr-change");
						fn(id, state);
					}}
				/>
				{/* <Nav go={"down"} onClick={() => setTime("hr-down")} /> */}
			</div>
			<Separate>:</Separate>
			<div>
				{/* <Nav go={"up"} onClick={() => setTime("min-up")} /> */}
				<Input
					type={"number"}
					value={min}
					onChange={(e) => {
						time_change(e, "min-change");
						fn(id, state);
					}}
				/>
				{/* <Nav go={"down"} onClick={() => setTime("min-down")} /> */}
			</div>
		</Wrapper>
	);
};

// export default TimePicker;
