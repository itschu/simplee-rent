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
import { useState, useRef, useEffect } from "react";
import { selectTimeTemp } from "./initialState";
import { useShowingsContext } from "../../../context";
import DatePicker from "react-multi-date-picker";
import NewTimePicker from "../TimePicker/NewTimePicker";
import { formatDate } from "../../../data";

let setVisibility = "visible";

const ShowingModal = ({
	displayOverlay,
	close,
	allProps,
	curr,
	setCurr,
	chngEvnt,
}) => {
	const { showings, setShowings } = useShowingsContext();
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
	const [time_one, set_time_one] = useState({ ...selectTimeTemp });
	const [time_two, set_time_two] = useState({ ...selectTimeTemp });
	const [time_three, set_time_three] = useState({ ...selectTimeTemp });

	const [showSec, setShowSec] = useState(false);
	const [showThird, setShowThird] = useState(false);
	const [time, setTime] = useState([]);
	const [errorMsg, set_errorMsg] = useState("");

	const moreTime = () => {
		if (!showSec) {
			setShowSec(!showSec);
		} else {
			if (!showThird) {
				setShowThird(!showThird);
			}
		}
	};

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

	const addShowing = (e) => {
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

		let addItem = {
			id: (Math.random() + 1).toString(36).substring(showings.length + 1),
			property: "",
			duration: selectValue,
			date: value,
			time: newTimeArr,
			display_time: null,
			unique: thisProp,
			link: null,
		};

		const get_current_title = allProps.filter(
			(el) => el.unique == addItem.unique
		)[0].title;
		addItem = { ...addItem, property: get_current_title };
		//const oldShowings = showings.filter(el => el.unique !== addItem.unique);

		let set = true;
		time.map((el) => {
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

			if (itm !== "") {
				chngEvnt((old) => [...old, ...itm]);
			} else {
				chngEvnt((old) => [...old, ...newShowing]);
			}
			setShowings([...showings, addItem]);
			// setCurr([addItem]);
			reset();
		}
	};

	const reset = () => {
		set_thisProp("");
		set_time_one({ ...selectTimeTemp });
		set_time_two({ ...selectTimeTemp });
		set_time_three({ ...selectTimeTemp });
		setValue(new Date());
		setSelectValue("");
		set_errorMsg("");
		close();
	};

	return (
		<AddItemOverlay show={displayOverlay}>
			<EditWrapper>
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
								{allProps.map((el, i) => (
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
							<Label>Select A Date</Label>
							<DatePicker
								value={value}
								ref={mm}
								onChange={setValue}
								multiple={true}
								format="YYYY-MM-DD"
							/>
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

export default ShowingModal;
