import { useRouter } from "next/router";
import { Wrap } from "./style";
import {
	Select,
	Option,
	Label,
	InputSeparator,
	Input,
} from "../account/PropSect/style";
import { useState, useRef, useEffect } from "react";
import {
	TimePickerWrapper,
	TimePicker,
	GoUp,
	GoDown,
	Time,
} from "../account/ShowingSect/style";
import DayPicker from "react-day-picker";
import arrow from "../../public/images/arrow.png";
import Image from "next/image";
import { formatDate, mergeDate, get12hrs } from "../../data";
import moment from "moment";

const isEarlierThanEndLimit = (timeValue, endLimit, lastValue) => {
	const timeValueIsEarlier =
		moment(timeValue, "h:mmA").diff(moment(endLimit, "h:mmA")) < 0;
	const timeValueIsLaterThanLastValue =
		lastValue === undefined
			? true
			: moment(lastValue, "h:mmA").diff(moment(timeValue, "h:mmA")) < 0;
	return timeValueIsEarlier && timeValueIsLaterThanLastValue;
};

const dateInPast = function (firstDate, secondDate) {
	if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
		return true;
	}
	return false;
};

const BookShowing = ({ info }) => {
	const router = useRouter();
	let { email } = router.query;
	let time_value;

	const [value, setValue] = useState();
	const [selecteDate, setSelecteDate] = useState();
	const [selecteTime, setSelecteTime] = useState();
	const [tenantDetails, set_tenantDetails] = useState({
		name: "",
		email: "",
	});
	const [get_duration, set_get_duration] = useState("");
	const [timeToSelect, setTimeToSelect] = useState([]);

	const mm = useRef(null);
	const today = new Date();
	const [brokenLink, setBrokenLink] = useState();

	const getSelectedTime = (e) => {
		if (e !== "unset") {
			if (mm.current) {
				mm.current.classList?.remove("timeSelected");
				mm.current = e.target;
				mm.current.classList.add("timeSelected");
				setSelecteTime(mm.current.innerHTML);
			} else {
				mm.current = e.target;
				mm.current.classList.add("timeSelected");
				setSelecteTime(mm.current.innerHTML);
			}
		} else {
			mm.current?.classList?.remove("timeSelected");
			mm.current = null;
			setSelecteTime();
		}
	};
	const availableDates = info[0]?.date.map((el) => {
		let good = new Date(el);
		const selectedDate = new Date(el);
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		if (!(selectedDate < now)) {
			return good;
		}
	});

	const data = mergeDate(
		info[0]?.time[0],
		info[0]?.time[1],
		info[0]?.time[2]
	).sort();

	const checkAvailableDate = availableDates.filter((el) => el !== undefined);

	const modifiers = {
		disabled: { daysOfWeek: [6] },
		showingDate: availableDates,
	};

	const modifiersStyles = {
		showingDate: {
			color: "white",
			backgroundColor: "#6969f3",
		},
		monday: {
			color: "#ffc107",
			backgroundColor: "#fffdee",
		},
	};

	useEffect(() => {
		if (checkAvailableDate.length == "0") {
			setBrokenLink(false);
		} else if (
			checkAvailableDate.length == 1 &&
			formatDate(new Date()) == formatDate(checkAvailableDate[0])
		) {
			const currentTime = get12hrs(
				new Date().toLocaleTimeString("en-US", {
					hour: "numeric",
					hour12: true,
					minute: "numeric",
				})
			);

			if (data[data.length - 1] <= currentTime) {
				setBrokenLink(false);
			} else {
				setBrokenLink(info.length ? true : false);
			}
		} else {
			setBrokenLink(info.length ? true : false);
		}
	});

	useEffect(() => {
		if (value !== undefined) {
			let found = false;
			availableDates.map((el) => {
				const selectedDate = formatDate(new Date(value));
				const currElem = formatDate(new Date(el));
				if (currElem == selectedDate) found = true;
			});
			!found ? setSelecteDate() : setSelecteDate(value);
		}
	}, [value]);

	useEffect(() => {
		getSelectedTime("unset");
		const options = [];
		let [firstFrom] = info[0]?.time.filter((el) => el.id == 1);
		let firstTo = firstFrom.to;
		firstFrom = firstFrom.from;

		let [secFrom] = info[0]?.time.filter((el) => el.id == 2);
		let secTo = secFrom.to;
		secFrom = secFrom.from;

		let [thirdFrom] = info[0]?.time.filter((el) => el.id == 3);
		let thirdTo = thirdFrom.to;
		thirdFrom = thirdFrom.from;

		let from = firstFrom.includes("AM")
			? firstFrom.replace("AM", "")
			: firstFrom.replace("PM", "");

		let to = firstTo.includes("AM")
			? firstTo.replace("AM", "")
			: firstTo.replace("PM", "");

		const today = formatDate(new Date());

		let lastValue;
		const step = get_duration;

		const do_loop_fn = (timeValue, endLimit) => {
			let x = 0;
			do {
				if (x == 0) {
					if (formatDate(selecteDate) == today) {
						const currentTime = get12hrs(
							new Date().toLocaleTimeString("en-US", {
								hour: "numeric",
								hour12: true,
								minute: "numeric",
							})
						);
						if (!(get12hrs(timeValue) < currentTime)) {
							options.push(timeValue);
						}
					} else {
						options.push(timeValue);
					}
				}
				lastValue = timeValue;
				timeValue = moment(timeValue, "h:mmA")
					.add(step, "minutes")
					.format("h:mmA");

				if (typeof timeValue !== "object") {
					if (formatDate(selecteDate) == today) {
						const currentTime = new Date().toLocaleTimeString(
							"en-US",
							{
								hour: "numeric",
								hour12: true,
								minute: "numeric",
							}
						);
						if (!(get12hrs(timeValue) < get12hrs(currentTime))) {
							options.push(timeValue);
						}
					} else {
						options.push(timeValue);
					}
				}
				x++;
			} while (isEarlierThanEndLimit(timeValue, endLimit, lastValue));
		};

		if (get_duration !== "") {
			do_loop_fn(firstFrom, firstTo);
			if (secFrom) {
				do_loop_fn(secFrom, secTo);
			}
			if (thirdFrom) {
				do_loop_fn(thirdFrom, thirdTo);
			}
			const arrange = [];
			new Set(options).forEach((value) => {
				arrange.push(value);
			});

			// console.log(arrange, options);
			setTimeToSelect(arrange);
		}
	}, [get_duration, selecteDate]);

	return (
		<Wrap link={brokenLink}>
			<form>
				{brokenLink ? (
					<>
						<div className="duration">
							<h3 title="Fill in your details">
								Fill in your details
							</h3>
							<InputSeparator>
								<Label>Name *</Label>
								<Input
									type={"text"}
									required={true}
									name="name"
									value={tenantDetails.name}
									onChange={(e) =>
										set_tenantDetails({
											...tenantDetails,
											name: e.target.value,
										})
									}
								/>
								<br /> <br />
								<Label>Email *</Label>
								<Input
									type={"email"}
									required={true}
									name="email"
									value={tenantDetails.email}
									onChange={(e) =>
										set_tenantDetails({
											...tenantDetails,
											email: e.target.value,
										})
									}
								/>
							</InputSeparator>
							<Label>Duration *</Label>
							<Select
								onChange={(e) => {
									set_get_duration(e.target.value);
								}}
								value={get_duration}
								required={true}
							>
								<Option value={""} disabled>
									----- Select a duration -----
								</Option>
								{info[0].duration.map((duration, id) => {
									let time = parseInt(duration);
									let format =
										time < 60
											? `${time} minutes`
											: time < 120
											? `${time / 60} hour`
											: `${time / 60} hours`;
									return (
										<Option value={time} key={id}>
											{`${format}`}
										</Option>
									);
								})}
							</Select>
						</div>

						<div className="date">
							{selecteDate == undefined ? (
								<h3>Select a valid day</h3>
							) : (
								<h3>{formatDate(selecteDate, true)}</h3>
							)}

							<DayPicker
								fromMonth={today}
								toMonth={
									new Date(
										today.getUTCFullYear(),
										today.getUTCMonth() + 2
									)
								}
								selectedDays={value}
								onDayClick={setValue}
								modifiers={modifiers}
								modifiersStyles={modifiersStyles}
								disabledDays={[
									new Date(2017, 3, 12),
									new Date(2017, 3, 2),
									{
										after: new Date(2017, 3, 20),
										before: new Date(),
									},
								]}
							/>
						</div>

						<div className="time">
							<TimePickerWrapper>
								<h3>Choose a convinient time</h3>
								<TimePicker>
									<GoUp>
										<div>
											<Image src={arrow} alt="" />
										</div>
									</GoUp>
									{get_duration && (
										<div className="timeConainer">
											{timeToSelect.map((el, i) => (
												<Time
													onClick={(e) => {
														getSelectedTime(e);
													}}
													key={i}
												>
													{el}
												</Time>
											))}
										</div>
									)}
									{!get_duration && (
										<div className="timeConainer">
											<Time onClick={(e) => {}}>
												Select a duration
											</Time>
										</div>
									)}

									<GoDown>
										<div>
											<Image src={arrow} alt="" />
										</div>
									</GoDown>
								</TimePicker>
							</TimePickerWrapper>
						</div>
					</>
				) : brokenLink == undefined ? (
					<></>
				) : (
					<>
						<h2>This link is invalid!!</h2>
						<p>
							Sorry it appears that it is <b>broken</b> or
							<b>expired</b> please contact <b>{email}</b>.
						</p>
					</>
				)}
			</form>
		</Wrap>
	);
};

export default BookShowing;
