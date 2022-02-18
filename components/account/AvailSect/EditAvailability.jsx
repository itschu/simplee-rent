"use strict";
import {
	EditWrapper,
	AddItemOverlay,
	CloseBtn,
	H2,
	InputSeparator,
	Label,
	Input,
} from "../PropSect/style";
import {
	CalendarDiv,
	Wrap,
	Separate,
	AddTime,
	RemoveTime,
	ConfirmButton,
	CloseError,
	Error,
} from "../ShowingSect/style";
import { useAvailabilityContext } from "../../../context";
import DatePicker from "react-multi-date-picker";
import { useState, useRef, useEffect } from "react";
import { selectTimeTemp } from "../ShowingSect/initialState";
import NewTimePicker from "../TimePicker/NewTimePicker";
import { durationTemp } from "../../../data";

let setVisibility = "visible";

const updateAvailability = async (request, id) => {
	try {
		const res = await fetch(`/api/availability/${id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		return true;
	} catch (error) {
		return false;
	}
};

const EditAvailability = ({ displayEdit, close, currentProp, session }) => {
	const [checkedState, setCheckedState] = useState(new Array(4).fill(false));

	const { availability, setAvailability } = useAvailabilityContext();
	const [current] = availability.filter((el) => el.id == currentProp);
	const [value, setValue] = useState();
	const [showSec, setShowSec] = useState(current?.time[1]?.status || false);
	const [showThird, setShowThird] = useState(
		current?.time[2]?.status || false
	);
	const [errorMsg, set_errorMsg] = useState("");
	const [time, setTime] = useState([]);

	const [time_one, set_time_one] = useState(current?.time[0]);
	const [time_two, set_time_two] = useState(
		current?.time[1] || { ...selectTimeTemp }
	);
	const [time_three, set_time_three] = useState(
		current?.time[2] || { ...selectTimeTemp }
	);

	const mm = useRef(null);
	if (mm.current) {
		mm.current.children[0].classList.add("date-iput");
	}
	useEffect(() => {
		let updateDuration = checkedState;

		if (Array.isArray(current.date)) {
			setValue([...current.date]);
		} else {
			setValue([current.date]);
		}

		current.duration.map((el) => {
			let [getTime] = durationTemp.filter(({ value, index }) => {
				return value == el;
			});

			((position) => {
				const updatedCheckedState = updateDuration.map((item, index) =>
					index === position ? !item : item
				);
				updateDuration = updatedCheckedState;
			})(getTime.index);
		});
		setCheckedState(updateDuration);
	}, []);

	const moreTime = () => {
		if (!showSec) {
			setShowSec(!showSec);
		} else {
			if (!showThird) {
				setShowThird(!showThird);
			}
		}
	};

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

	const reset = () => {
		set_errorMsg("");
		close();
	};

	const checkBoxFn = (position) => {
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedState(updatedCheckedState);
	};

	const addShowing = async (e) => {
		e.preventDefault();

		if (Array.isArray(current.date)) {
			setValue([...current.date]);
		} else {
			setValue([current.date]);
		}
		let newTimeArr = time.map((el) => {
			if (el.id == 2) {
				return { ...el, status: showSec };
			} else if (el.id == 3) {
				return { ...el, status: showThird };
			} else {
				return el;
			}
		});

		let set = true;
		newTimeArr.map((el) => {
			//add another condition to check if time is past and turn 12:00 from ''
			if (el.from == el.to && el.id == 1) {
				set_errorMsg(`The start and end time cannot be the same`);
				set = false;
			}
			if (el.from == el.to && el.id == 2 && showSec == true) {
				set_errorMsg(`The start and end time cannot be the same`);
				set = false;
			}
			if (el.from == el.to && el.id == 3 && showThird == true) {
				set_errorMsg(`The start and end time cannot be the same`);
				set = false;
			}
		});

		if (set) {
			const newDuration = [];
			durationTemp.map(({ index, value }) => {
				if (checkedState[index]) {
					newDuration.push(value);
				}
			});
			const oldAvailability = availability.filter(
				(el) => el.id !== current.id
			);
			current.date = value;
			current.time = time;
			current.owner = session.email;
			current.duration = newDuration;

			await updateAvailability(current, current._id);
			setAvailability([...oldAvailability, current]);
			reset();
		}
	};

	// const checkDuration = (time) => current.duration.includes(time);
	return (
		<AddItemOverlay show={displayEdit}>
			<EditWrapper>
				<form onSubmit={(e) => addShowing(e)}>
					<CloseBtn onClick={() => reset()} />
					<H2>{`Edit ${current?.property} Availability`}</H2>

					<InputSeparator checkbox={true}>
						<div>
							<Label>Property</Label>
							<Input value={current.property} disabled />
						</div>
						<br />
						<div>
							<Label>Duration</Label>

							<div>
								{durationTemp.map((el, i) => (
									<span key={i}>
										<input
											type="checkbox"
											onChange={(e) =>
												checkBoxFn(el.index)
											}
											checked={checkedState[el.index]}
										/>
										<label>{el.title} &nbsp;&nbsp;</label>
									</span>
								))}
							</div>
						</div>
					</InputSeparator>

					<CalendarDiv>
						<div>
							<Label>Date</Label>
							<DatePicker
								value={value}
								ref={mm}
								onChange={setValue}
								multiple={true}
								format="YYYY-MM-DD"
							/>
						</div>

						<div>
							<Label>Time</Label>

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
										stp={current.duration[0]}
										types={"from"}
										id={1}
										fn={changeTimeArray}
										stateFn={set_time_one}
										state={time_one}
									/>
									<Separate>-</Separate>
									<NewTimePicker
										stp={current.duration[0]}
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
											stp={current.duration[0]}
											types={"from"}
											id={2}
											fn={changeTimeArray}
											stateFn={set_time_two}
											state={time_two}
										/>
										<Separate>-</Separate>
										<NewTimePicker
											stp={current.duration[0]}
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
											stp={current.duration[0]}
											types={"from"}
											id={3}
											fn={changeTimeArray}
											stateFn={set_time_three}
											state={time_three}
										/>
										<Separate>-</Separate>
										<NewTimePicker
											stp={current.duration[0]}
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
								<ConfirmButton>Save</ConfirmButton>
							</div>
						</div>
					</CalendarDiv>
				</form>
			</EditWrapper>
		</AddItemOverlay>
	);
};

export default EditAvailability;
