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
import { CalendarDiv, ConfirmButton, AddTime, RemoveTime, Wrap } from "./style";
import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import TimePicker from "../TimePicker";
import { template, selectTimeTemp } from "./initialState";
import { useShowingsContext } from "../../../context";

let setVisibility = "visible";

const ShowingModal = ({ displayOverlay, close, allProps }) => {
	const { showings, setShowings } = useShowingsContext();
	const thisProp = useRef(null);
	const [value, setValue] = useState(new Date());
	const getToday = new Date();
	const show = getToday.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	});
	const maxDay = new Date();
	maxDay.setDate(maxDay.getDate() + 90);
	const [selectValue, setSelectValue] = useState("");
	const [time_one, set_time_one] = useState({ ...selectTimeTemp });
	const [time_two, set_time_two] = useState({ ...selectTimeTemp });
	const [time_three, set_time_three] = useState({ ...selectTimeTemp });

	const [showSec, setShowSec] = useState(false);
	const [showThird, setShowThird] = useState(false);
	const [current, setCurrent] = useState([...template]);
	const [time, setTime] = useState([]);

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

	const changeTimeArray = (id, time_state) => {
		const new_time = time.filter((el, i) => i + 1 != id);
		const newObj = {
			id: id,
			from: `${time_state.from.firstHr} : ${time_state.from.firstMin}`,
			to: `${time_state.to.firstHr} : ${time_state.to.firstMin}`,
			status: true,
		};
		setTime([newObj, ...new_time]);
	};

	useEffect(() => {
		time.map((el, id) => {
			id += 1;
			if (id == 2) {
				el.status = showSec;
			} else if (id == 3) {
				el.status = showThird;
			} else if (id == 1) {
				el.status = true;
			} else {
				el.status = false;
			}
		});
		setCurrent({
			id: (Math.random() + 1).toString(36).substring(showings.length + 1),
			property: "property title",
			duration: selectValue,
			date: value,
			time: time,
			display_time: null,
			unique: thisProp.current,
			link: null,
		});

	}, [thisProp.current, selectValue, value, time, showings]);

	const addShowing = (e) => {
		e.preventDefault();
		const get_current_title = allProps.filter(
			(el) => el.unique == current.unique
		)[0].title;
		setShowings([...showings, { ...current, property: get_current_title }]);
		close();
	};
	return (
		<AddItemOverlay show={displayOverlay}>
			<EditWrapper>
				<form onSubmit={(e) => addShowing(e)}>
					<CloseBtn onClick={() => close()} />

					<H2>{`Add Showing`}</H2>
					{/* <br/> */}
					<InputSeparator separate={true}>
						<div>
							<Label>Select Property</Label>
							<Select
								defaultValue={current.property || ""}
								ref={thisProp}
								onChange={(e) =>
									(thisProp.current = e.target.value)
								}
								// defaultValue={thisProp.current}
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
							<Calendar
								onChange={setValue}
								value={value}
								minDate={getToday}
								maxDate={maxDay}
								selectRange={true}
							/>
						</div>

						<div>
							<Label>Select Time</Label>
							<br />
							<div>
								<Wrap>
									<TimePicker
										min={time_one.from.firstMin}
										hr={time_one.from.firstHr}
										types={"from"}
										stateFn={set_time_one}
										state={time_one}
										hour={time_one.from.firstHr}
										minute={time_one.from.firstMin}
										id={1}
										fn={changeTimeArray}
									/>
									<div>-</div>
									<TimePicker
										min={time_one.to.firstMin}
										hr={time_one.to.firstHr}
										types={"to"}
										stateFn={set_time_one}
										state={time_one}
										hour={time_one.to.firstHr}
										minute={time_one.to.firstMin}
										id={1}
										fn={changeTimeArray}
									/>
									<AddTime
										onClick={moreTime}
										see={setVisibility}
									/>
								</Wrap>

								{showSec && (
									<Wrap>
										<TimePicker
											min={time_two.from.firstMin}
											hr={time_two.from.firstHr}
											types={"from"}
											stateFn={set_time_two}
											state={time_two}
											hour={time_two.from.firstHr}
											minute={time_two.from.firstMin}
											id={2}
											fn={changeTimeArray}
										/>
										<div>-</div>
										<TimePicker
											min={time_two.to.firstMin}
											hr={time_two.to.firstHr}
											types={"to"}
											stateFn={set_time_two}
											state={time_two}
											hour={time_two.to.firstHr}
											minute={time_two.to.firstMin}
											id={2}
											fn={changeTimeArray}
										/>
										<RemoveTime
											onClick={() => setShowSec(!showSec)}
										/>
									</Wrap>
								)}

								{showThird && (
									<Wrap>
										<TimePicker
											min={time_three.from.firstMin}
											hr={time_three.from.firstHr}
											types={"from"}
											stateFn={set_time_three}
											state={time_three}
											hour={time_three.from.firstHr}
											minute={time_three.from.firstMin}
											id={3}
											fn={changeTimeArray}
										/>
										<div>-</div>
										<TimePicker
											min={time_three.to.firstMin}
											hr={time_three.to.firstHr}
											types={"to"}
											stateFn={set_time_three}
											state={time_three}
											hour={time_three.to.firstHr}
											minute={time_three.to.firstMin}
											id={3}
											fn={changeTimeArray}
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
