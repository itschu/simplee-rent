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
import success_img from "../../public/images/checked.png";
import Image from "next/image";
import { formatDate, mergeDate, get12hrs, randomId } from "../../data";
import moment from "moment";
import { Button } from "../account/PropSect/style";
import Link from "next/link";
import validator from "validator";
// import { useShowingsContext } from "../../context";

const isEarlierThanEndLimit = (timeValue, endLimit, lastValue) => {
	const timeValueIsEarlier =
		moment(timeValue, "h:mmA").diff(moment(endLimit, "h:mmA")) < 0;
	const timeValueIsLaterThanLastValue =
		lastValue === undefined
			? true
			: moment(lastValue, "h:mmA").diff(moment(timeValue, "h:mmA")) < 0;
	return timeValueIsEarlier && timeValueIsLaterThanLastValue;
};

const addShowing = async (request) => {
	try {
		const res = await fetch(`/api/showing`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		if (res.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

const BookShowing = ({ info, bookedShowing }) => {
	const router = useRouter();
	let { email, prop } = router.query;
	const alreadySeledtedDates = [];
	const [value, setValue] = useState();
	const [selecteDate, setSelecteDate] = useState();
	const [selecteTime, setSelecteTime] = useState();
	const [loading, setLoading] = useState();
	const [tenantDetails, set_tenantDetails] = useState({
		name: "",
		email: "",
		duration: "",
		date: "",
		time: "",
		phone_number: "",
	});
	const [get_duration, set_get_duration] = useState(info[0]?.duration[0]);
	const [timeToSelect, setTimeToSelect] = useState([]);
	const [success, set_success] = useState(false);
	const [errors, setErrors] = useState({ email_error: "", number_error: "" });
	const mm = useRef(null);
	const submit_btn = useRef(null);
	const form_ref = useRef(null);

	const today = new Date();
	const [brokenLink, setBrokenLink] = useState();
	let finalTime = "";

	bookedShowing
		.filter((el) => el.date == formatDate(selecteDate))
		.forEach((el) => {
			alreadySeledtedDates.push(el.time);
		});
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

	let availableDates = info[0]?.date.map((el) => {
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

	if (!Array.isArray(availableDates)) availableDates = [];
	const checkAvailableDate = availableDates.filter((el) => el !== undefined);

	const modifiers = {
		disabled: { daysOfWeek: [6] },
		showingDate: availableDates,
	};

	const modifiersStyles = {
		showingDate: {
			// color: "white",
			borderRadius: "30px",
			outline: "tomato solid 1px",
		},
		monday: {
			color: "#ffc107",
			backgroundColor: "#fffdee",
		},
	};

	useEffect(() => {
		let newError = { ...errors };
		if (tenantDetails.email !== "") {
			validator.isEmail(tenantDetails.email)
				? (newError = { ...newError, email_error: "" })
				: (newError = {
						...newError,
						email_error: "Please enter a valid email address",
				  });
			console.log(errors);
		} else {
			newError = { ...newError, email_error: "" };
		}
		if (tenantDetails.phone_number !== "") {
			validator.isMobilePhone(tenantDetails.phone_number, [
				"en-NG",
				"en-CA",
			])
				? (newError = { ...newError, number_error: "" })
				: (newError = {
						...newError,
						number_error: "Please enter a valid mobile number",
				  });
		} else {
			newError = { ...newError, number_error: "" };
		}
		if (
			validator.isMobilePhone(tenantDetails.phone_number, [
				"en-NG",
				"en-CA",
			]) ||
			validator.isEmail(tenantDetails.email)
		) {
			submit_btn.current.disabled = true;
			submit_btn.current.classList.add("disabled");
		} else {
			// tenantDetails.phone_number !== "" && submit_btn.current.disabled = false;
			tenantDetails.phone_number !== "" &&
				submit_btn.current.classList.remove("disabled");
		}
		setErrors({ ...newError });
	}, [tenantDetails.phone_number, tenantDetails.email]);

	useEffect(() => {
		if (submit_btn.current) {
			if (
				tenantDetails.name !== "" &&
				tenantDetails.email !== "" &&
				get_duration !== "" &&
				selecteDate !== undefined &&
				selecteDate !== "" &&
				selecteTime !== undefined &&
				selecteTime !== ""
			) {
				submit_btn.current.disabled = false;
				submit_btn.current.classList.remove("disabled");
				finalTime = selecteTime;
				set_tenantDetails({
					...tenantDetails,
					duration: get_duration,
					date: selecteDate,
					time: selecteTime,
					propertyId: prop,
				});
			} else {
				submit_btn.current.disabled = true;
				submit_btn.current.classList.add("disabled");
			}
		} else {
			set_tenantDetails({
				name: "",
				email: "",
				duration: "",
				date: "",
				time: "",
				propertyId: "",
				owner: email,
				phone_number: "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		tenantDetails.name,
		tenantDetails.email,
		get_duration,
		selecteDate,
		selecteTime,
	]);

	useEffect(() => {
		if (checkAvailableDate.length == "0") {
			setBrokenLink(false);
		} else if (
			checkAvailableDate.length == 1 &&
			formatDate(new Date()) == formatDate(checkAvailableDate[0])
		) {
			const d = new Date();
			d.setMinutes(d.getMinutes() + info[0].duration[0]);
			const currentTime = get12hrs(
				d.toLocaleTimeString("en-US", {
					hour: "numeric",
					hour12: true,
					minute: "numeric",
				})
			);
			// console.log(data[data.length - 1], d, currentTime);

			if (data[data.length - 1] <= currentTime) {
				setBrokenLink(false);
			} else {
				setBrokenLink(info.length ? true : false);
			}
		} else {
			setBrokenLink(info.length ? true : false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkAvailableDate, data, info.length]);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		if (availableDates.length > 0) {
			getSelectedTime("unset");
			const options = [];
			let [firstFrom] = info[0]?.time.filter((el) => el.id == 1);
			let firstTo = firstFrom.to;
			firstFrom = firstFrom.from;

			let [secFrom] = info[0]?.time.filter((el) => el.id == 2);
			let secTo = secFrom?.to;
			secFrom = secFrom?.from;

			let [thirdFrom] = info[0]?.time.filter((el) => el.id == 3);
			let thirdTo = thirdFrom?.to;
			thirdFrom = thirdFrom?.from;

			/** let from = firstFrom.includes("AM")
				? firstFrom.replace("AM", "")
				: firstFrom.replace("PM", "");

			let to = firstTo.includes("AM")
				? firstTo.replace("AM", "")
				: firstTo.replace("PM", ""); */

			const today = formatDate(new Date());

			let lastValue;
			const step = info[0].duration[0];

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
								!alreadySeledtedDates.includes(timeValue) &&
									options.push(timeValue);
							}
						} else {
							!alreadySeledtedDates.includes(timeValue) &&
								options.push(timeValue);
						}
					}
					//alreadySeledtedDates
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
							if (
								!(get12hrs(timeValue) < get12hrs(currentTime))
							) {
								!alreadySeledtedDates.includes(timeValue) &&
									options.push(timeValue);
							}
						} else {
							!alreadySeledtedDates.includes(timeValue) &&
								options.push(timeValue);
						}
					}
					x++;
				} while (isEarlierThanEndLimit(timeValue, endLimit, lastValue));
				options.pop();
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

				setTimeToSelect(arrange);
			}
		} else {
			setBrokenLink(info.length ? true : false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [get_duration, selecteDate]);

	const submitShowing = async (e) => {
		e.preventDefault();
		setLoading(true);
		//run validation on input
		submit_btn.current.disabled = true;
		submit_btn.current.classList.add("disabled");
		const verdict = await addShowing(tenantDetails);
		if (verdict) {
			set_success(true);
		} else {
			setLoading(false);
			submit_btn.current.disabled = false;
			submit_btn.current.classList.remove("disabled");
		}
	};

	return (
		<Wrap link={brokenLink}>
			{!success ? (
				<form ref={form_ref} onSubmit={(e) => submitShowing(e)}>
					{!success && loading && (
						<div className="loading">
							<div className="loader"></div>
						</div>
					)}
					{brokenLink && (
						<h1>
							{`Book a ${
								get_duration < 60
									? `${get_duration} minutes`
									: get_duration < 120
									? `${get_duration / 60} hour`
									: `${get_duration / 60} hours`
							} showing for ${info[0].property} `}

							{selecteDate == undefined
								? "(Select a valid day)"
								: `(${formatDate(selecteDate, true)})`}
						</h1>
					)}

					<div className="form-body">
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
											placeholder="Your full name"
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
											placeholder="your_email@example.com"
											value={tenantDetails.email}
											onChange={(e) =>
												set_tenantDetails({
													...tenantDetails,
													email: e.target.value,
												})
											}
										/>
										<span className="error-text">
											{errors.email_error}
										</span>
										<br /> <br />
										<Label>Phone Number *</Label>
										<Input
											type={"number"}
											required={true}
											placeholder="+1 XXX XX..."
											// pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
											name="number"
											value={tenantDetails.phone_number}
											onChange={(e) =>
												set_tenantDetails({
													...tenantDetails,
													phone_number:
														e.target.value,
												})
											}
										/>
										<span className="error-text">
											{errors.number_error}
										</span>
										{/* <br /> <br />
										<Label>Duration</Label>
										<Input
											type={"text"}
											required={true}
											name="duration"
											value={
												get_duration < 60
													? `${get_duration} minutes`
													: get_duration < 120
													? `${
															get_duration / 60
													  } hour`
													: `${
															get_duration / 60
													  } hours`
											}
											disabled
										/> */}
									</InputSeparator>
									{/**
										<>
											<Label>Duration *</Label>
											<Select
												onChange={(e) => {
													set_get_duration(
														e.target.value
													);
												}}
												value={get_duration}
												required={true}
											>
												<Option value={""} disabled>
													----- Select a duration
													-----
												</Option>
												{info[0].duration.map(
													(duration, id) => {
														let time =
															parseInt(duration);
														let format =
															time < 60
																? `${time} minutes`
																: time < 120
																? `${
																		time /
																		60
																  } hour`
																: `${
																		time /
																		60
																  } hours`;
														return (
															<Option
																value={time}
																key={id}
															>
																{`${format}`}
															</Option>
														);
													}
												)}
											</Select>
										</>
									 */}
								</div>

								<div className="date">
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
													{timeToSelect.map(
														(el, i) => (
															<Time
																onClick={(
																	e
																) => {
																	getSelectedTime(
																		e
																	);
																}}
																key={i}
															>
																{el}
															</Time>
														)
													)}
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
									<b>expired</b> please contact <b>{email}</b>
									.
								</p>
							</>
						)}
					</div>
					{brokenLink && (
						<Button
							btn_for="save"
							ref={submit_btn}
							type="submit"
							disabled={true}
							className="disabled"
						>
							Submit
						</Button>
					)}
				</form>
			) : (
				<div className="success">
					<div className="img-good">
						<Image src={success_img} alt="success image" />
					</div>

					<h3>Congratulations</h3>
					<p id="para">
						You have successfully booked a showing with &nbsp;
						<b>{email}</b> on <b>{formatDate(selecteDate, true)}</b>
						&nbsp; for <b>{tenantDetails.time}</b>
					</p>
					<Link href={"/"} passHref>
						<Button btn_for="save" type="button">
							Back
						</Button>
					</Link>
				</div>
			)}
		</Wrap>
	);
};

export default BookShowing;

// cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
