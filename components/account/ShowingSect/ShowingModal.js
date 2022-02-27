"use strict";
import {
	EditWrapper,
	AddItemOverlay,
	CloseBtn,
	H2,
	InputSeparator,
	Label,
	Select,
	Option,
} from "../PropSect/style";
import {
	CalendarDiv,
	ConfirmButton,
	AddTime,
	Error,
	RemoveTime,
	Wrap,
	CloseError,
	Separate,
} from "./style";
import { useState, useRef, memo } from "react";
import { selectTimeTemp } from "./initialState";
import { useAvailabilityContext } from "../../../context";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import NewTimePicker from "../TimePicker/NewTimePicker";
import { formatDate, randomId } from "../../../data";
import moment from "moment";

let setVisibility = "visible";

const addAvailability = async (request) => {
	try {
		const res = await fetch(`/api/availability`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		const dataG = JSON.parse(await res.text());
		if (res.ok && dataG.success == true) {
			return dataG.data._doc;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

const ShowingModal = ({ displayOverlay, close, allProps, session }) => {
	const { availability, setAvailability } = useAvailabilityContext();
	const [thisProp, set_thisProp] = useState("");
	const mm = useRef(null);
	const [value, setValue] = useState(new Date());
	const getToday = new Date();
	const show = getToday.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	});
	if (mm.current) {
		mm.current.children[0].classList.add("date-iput");
	}
	const maxDay = new Date();
	maxDay.setDate(maxDay.getDate() + 90);
	const [selectValue, setSelectValue] = useState("");
	const [loadingState, loadingState_fn] = useState(false);
	const [time_one, set_time_one] = useState({ ...selectTimeTemp });
	const [time_two, set_time_two] = useState({ ...selectTimeTemp });
	const [time_three, set_time_three] = useState({ ...selectTimeTemp });

	const [showSec, setShowSec] = useState(false);
	const [showThird, setShowThird] = useState(false);
	const [time, setTime] = useState([]);
	const [errorMsg, set_errorMsg] = useState("");
	let filteredProps;

	const moreTime = () => {
		if (!showSec) {
			setShowSec(!showSec);
		} else {
			if (!showThird) {
				setShowThird(!showThird);
			}
		}
	};

	if (availability.length > 0) {
		filteredProps = allProps.filter(
			(elem) => !availability.find(({ unique }) => elem.unique === unique)
		);
	} else {
		filteredProps = allProps;
	}

	showSec == true && showThird == true
		? (setVisibility = "hidden")
		: (setVisibility = "visible");

	const changeTimeArray = (id) => {
		let newArray;
		const old_time = time.filter((el) => id != el.id);
		const newObj = {
			id: id,
			from:
				id == 1
					? time_one.from
					: id == 2
					? time_two.from
					: id == 3
					? time_three.from
					: "",
			to:
				id == 1
					? time_one.to
					: id == 2
					? time_two.to
					: id == 3
					? time_three.to
					: "",
			status: true,
		};
		if (time.length > 0) {
			newArray = [newObj, ...old_time];
		} else {
			newArray = [newObj];
		}
		setTime(newArray);
	};

	const addShowing = async (e) => {
		e.preventDefault();
		let newTimeArr = time.map((el) => {
			if (el.id == 2) {
				return { ...el, status: showSec };
			} else if (el.id == 3) {
				return { ...el, status: showThird };
			} else {
				return el;
			}
		});
		const userLink = `${window.location.origin}/showings/${session.email}`;
		const rand = randomId(availability.length);

		let addItem = {
			id: rand,
			property: "",
			duration: [selectValue],
			date: Array.isArray(value) ? value : [value],
			time: newTimeArr,
			display_time: null,
			unique: thisProp,
			link: `${userLink}/${rand}`,
			owner: session.email,
		};

		const get_current_title = allProps.filter(
			(el) => el.unique == addItem.unique
		)[0].title;
		addItem = { ...addItem, property: get_current_title };
		//const oldShowings = availability.filter(el => el.unique !== addItem.unique);

		let set = true;
		time.map((el) => {
			//add another condition to check if time is past and turn 12:00 from ''
			if (
				(moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") ||
					moment(el.to, ["h:mm A"]).format("HH:mm") == "23:59") &&
				el.id == 1
			) {
				set_errorMsg(`The start and end time cannot be equal`);
				set = false;
			}
			if (
				(moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") ||
					moment(el.to, ["h:mm A"]).format("HH:mm") == "23:59") &&
				el.id == 2 &&
				showSec == true
			) {
				set_errorMsg(`The start and end time cannot be equal`);
				set = false;
			}
			if (
				(moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") ||
					moment(el.to, ["h:mm A"]).format("HH:mm") == "23:59") &&
				el.id == 3 &&
				showThird == true
			) {
				set_errorMsg(`The start and end time cannot be equal`);
				set = false;
			}

			if (
				moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") &&
				el.id == 1
			) {
				set_errorMsg(
					`The start time cannot be greater than the end time or equal`
				);
				set = false;
			}
			if (
				moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") &&
				el.id == 2 &&
				showSec == true
			) {
				set_errorMsg(
					`The start time cannot be greater than the end time or equal`
				);
				set = false;
			}
			if (
				moment(el.from, ["h:mm A"]).format("HH:mm") >
					moment(el.to, ["h:mm A"]).format("HH:mm") &&
				el.id == 3 &&
				showThird == true
			) {
				set_errorMsg(
					`The start time cannot be greater than the end time or equal`
				);
				set = false;
			}
		});

		if (set) {
			loadingState_fn(true);
			let itm = "";
			let newShowing = [addItem].map((el) => {
				if (Array.isArray(el.date)) {
					itm = el.date.map((elem) => {
						return {
							title: `${el.property} ${el.duration} mins showing`,
							date: formatDate(elem),
						};
					});
					return;
				} else {
					return {
						title: `${el.property} showing`,
						date: formatDate(el.date),
					};
				}
			});
			const added = await addAvailability(addItem);
			if (added) {
				setAvailability([...availability, added]);
			} else {
				// set error
			}
			loadingState_fn(false);
			reset();
		}
		loadingState_fn(false);
	};

	const reset = () => {
		set_thisProp("");
		set_time_one({ ...selectTimeTemp });
		set_time_two({ ...selectTimeTemp });
		set_time_three({ ...selectTimeTemp });
		setValue(new Date());
		setSelectValue("");
		set_errorMsg("");
		setShowSec(false);
		setShowThird(false);
		close();
	};

	// console.log(availability);

	return (
		<AddItemOverlay show={displayOverlay}>
			<EditWrapper>
				{loadingState && (
					<div className="loading">
						<div className="loader"></div>
					</div>
				)}
				<form onSubmit={(e) => addShowing(e)}>
					<CloseBtn onClick={() => reset()} />

					<H2>{`Add Showing`}</H2>
					{/* <br/> */}
					<InputSeparator separate={true}>
						<div>
							<Label>Select Property</Label>
							<Select
								onChange={(e) => set_thisProp(e.target.value)}
								value={thisProp}
								required={true}
							>
								<Option value={""}>
									----- Select a property -----
								</Option>
								{filteredProps.map((el, i) => (
									<Option value={el.unique} key={i}>
										{el.title}
									</Option>
								))}
							</Select>
						</div>

						<div>
							<Label>Duration</Label>
							<Select
								// defaultValue={current.duration}
								onChange={(e) =>
									setSelectValue(parseInt(e.target.value))
								}
								value={selectValue}
								required={true}
							>
								<Option value={""} disabled>
									----- Select a duration -----
								</Option>
								<Option value={15}>15 minutes</Option>
								<Option value={30}>30 minutes</Option>
								<Option value={60}>1 hour</Option>
								<Option value={120}>2 hours</Option>
							</Select>
						</div>
					</InputSeparator>

					<CalendarDiv>
						<div>
							<Label>Select Date</Label>
							<div className="input-date-align">
								<DatePicker
									value={value}
									ref={mm}
									multiple={true}
									onOpen={() => false}
									format="YYYY-MM-DD"
								/>
								&nbsp;&nbsp;
								<DatePicker
									value={value}
									render={<Icon />}
									onChange={setValue}
									multiple={true}
									minDate={moment().toDate()}
								/>
							</div>
						</div>

						<div>
							<Label>Select Time</Label>
							{errorMsg !== "" && (
								<Error>
									{errorMsg}
									<CloseError
										onClick={() => set_errorMsg("")}
									/>
								</Error>
							)}
							<br />
							<div>
								<Wrap>
									<NewTimePicker
										stp={selectValue}
										types={"from"}
										id={1}
										fn={changeTimeArray}
										stateFn={set_time_one}
										state={time_one}
									/>
									<Separate>-</Separate>
									<NewTimePicker
										stp={selectValue}
										types={"to"}
										id={1}
										fn={changeTimeArray}
										stateFn={set_time_one}
										state={time_one}
										begin={time_one.from}
									/>
									<AddTime
										onClick={moreTime}
										see={setVisibility}
									/>
								</Wrap>

								{showSec && (
									<Wrap>
										<NewTimePicker
											stp={selectValue}
											types={"from"}
											id={2}
											fn={changeTimeArray}
											stateFn={set_time_two}
											state={time_two}
										/>
										<Separate>-</Separate>
										<NewTimePicker
											stp={selectValue}
											types={"to"}
											id={2}
											fn={changeTimeArray}
											stateFn={set_time_two}
											state={time_two}
											begin={time_two.from}
										/>
										<RemoveTime
											onClick={() => setShowSec(!showSec)}
										/>
									</Wrap>
								)}

								{showThird && (
									<Wrap>
										<NewTimePicker
											stp={selectValue}
											types={"from"}
											id={3}
											fn={changeTimeArray}
											stateFn={set_time_three}
											state={time_three}
										/>
										<Separate>-</Separate>
										<NewTimePicker
											stp={selectValue}
											types={"to"}
											id={3}
											fn={changeTimeArray}
											stateFn={set_time_three}
											state={time_three}
											begin={time_three.from}
										/>
										<RemoveTime
											onClick={() =>
												setShowThird(!showThird)
											}
										/>
									</Wrap>
								)}
								<ConfirmButton>Confirm</ConfirmButton>
							</div>
						</div>
					</CalendarDiv>
				</form>
			</EditWrapper>
		</AddItemOverlay>
	);
};

export default memo(ShowingModal);
