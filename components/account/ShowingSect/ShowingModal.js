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
import TimePicker, { formatTime } from "../TimePicker";
import { template, timeTemp } from "./initialState";

let d = new Date();
let h = formatTime(d.getHours());
let m = formatTime(d.getMinutes());
let setVisibility = "visible";

const ShowingModal = ({ displayOverlay, close, allProps }) => {
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
	const [selectValue, setSelectValue] = useState(15);
	const [firstHr, setFirstHr] = useState(formatTime(d.getHours()));
	const [firstMin, setFirstMin] = useState(formatTime(d.getMinutes()));
	const [secHr, setSecHr] = useState(formatTime(d.getHours()));
	const [secMin, setSecMin] = useState(formatTime(d.getMinutes()));
	const [thirdHr, setThirdHr] = useState(formatTime(d.getHours()));
	const [thirdMin, setThirdMin] = useState(formatTime(d.getMinutes()));
	const [showSec, setShowSec] = useState(false);
	const [showThird, setShowThird] = useState(false);
	const [current, setCurrent] = useState([...template]);
	const [time, setTime] = useState(timeTemp);

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

	const changeTimeArray = (id, hr, min) => {
		const new_time = time.filter((el, i) => i + 1 == id);
		const [obj] = new_time;
		obj.hour = `${hr}`;
		obj.minutes = `${min}`;
		obj.status = true;
		setTime([...time]);
	};

	useEffect(() => {
		time.map((el, id) => {
			id+=1;
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
		setCurrent({id:0, property:thisProp.current, duration: selectValue, date: value, time: time} )
	}, [thisProp.current, selectValue, value, time]);

	return (
		<AddItemOverlay show={displayOverlay}>
			<EditWrapper>
				<div>
					<CloseBtn onClick={() => close()} />

					<H2>{`Add Showing`}</H2>
					{/* <br/> */}
					<InputSeparator separate={true}>
						<div>
							<Label>Select Property</Label>
							<Select
								defaultValue={current.property}
								ref={thisProp}
								onChange={(e) =>
									(thisProp.current = e.target.value)
								}
							>
								<Option value={"default"} disabled>
									Select a property
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
								defaultValue={current.duration}
								onChange={(e) =>
									setSelectValue(parseInt(e.target.value))
								}
							>
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
										min={firstMin}
										hr={firstHr}
										setHr={setFirstHr}
										setMin={setFirstMin}
										hour={firstHr}
										minute={firstMin}
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
										{/* <br /> */}
										<TimePicker
											min={secMin}
											hr={secHr}
											setHr={setSecHr}
											setMin={setSecMin}
											hour={secHr}
											minute={secMin}
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
										{/* <br /> */}
										<TimePicker
											min={thirdMin}
											hr={thirdHr}
											setHr={setThirdHr}
											setMin={setThirdMin}
											hour={thirdHr}
											minute={thirdMin}
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
				</div>
			</EditWrapper>
		</AddItemOverlay>
	);
};

export default ShowingModal;
