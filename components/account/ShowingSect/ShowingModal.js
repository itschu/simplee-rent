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
import { TimePickerWrapper, TimePicker, Time, GoUp, GoDown } from "./style";
import { useState, useRef } from "react";
import Calendar from "react-calendar";
import arrow from "../../../public/images/arrow.png";
import Image from "next/image";
// import "react-calendar/dist/Calendar.css";

const ShowingModal = ({ displayOverlay, close, allProps }) => {
	const [value, setValue] = useState(new Date());
	const [selectValue, setSelectValue] = useState(15);
	const [selectedTime, setSelectedTime] = useState(null);
	const thisProp = useRef(null);
	const oldSelected = useRef(null);
	const getToday = new Date();
	const maxDay = new Date();
	maxDay.setDate(maxDay.getDate() + 31);
	let t = new Date(value);

	const createTimeArray = (duration) => {
		const timeArray = [];
		for (let i = 0; i < 9; i++) {
			t = new Date(t);
			let old = new Date(t);
			t.setMinutes(t.getMinutes() + duration);
			timeArray.push({ old, t });
		}
		return timeArray;
	};
	const availableTime = createTimeArray(selectValue);

	const thisTime = (e = null, closeModal = false) => {
		if (closeModal == false) {
			oldSelected.current !== null
				? oldSelected.current.classList.remove("activeTimeBackground")
				: (oldSelected.current = e.target);
			e.target.classList.add("activeTimeBackground");
			oldSelected.current = e.target;
			setSelectedTime(e.target.innerHTML);
		} else {
			oldSelected.current !== null
				? oldSelected.current.classList.remove("activeTimeBackground")
				: (oldSelected.current = null);
			setSelectedTime(null);
		}
	};
	return (
		<AddItemOverlay show={displayOverlay}>
			<EditWrapper>
				<div>
					<CloseBtn
						onClick={() => {
							thisTime(null, true);
							close();
						}}
					/>

					<H2>{`Add Showing`}</H2>
					{/* <br/> */}
					<InputSeparator separate={true}>
						<div>
							<Label>Select Property</Label>
							<Select
								defaultValue={`default`}
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
								defaultValue={15}
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

					<Label>Select A Date</Label>
					<Calendar
						onChange={setValue}
						value={value}
						minDate={getToday}
						maxDate={maxDay}
					/>
				</div>

				<TimePickerWrapper>
					<Label>Pick A Time</Label>
					<TimePicker>
						<GoUp>
							<div>
								<Image src={arrow} alt="" />
							</div>
						</GoUp>
						{availableTime.map((el, i) => {
							const str = el.t;
							const result = str.toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							});

							const str2 = el.old;
							const result2 = str2.toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							});
							return (
								<Time key={i} onClick={(e) => thisTime(e)}>
									{`${result2} - ${result}`}
								</Time>
							);
						})}
						<GoDown>
							<div>
								<Image src={arrow} alt="" />
							</div>
						</GoDown>
					</TimePicker>
				</TimePickerWrapper>
			</EditWrapper>
		</AddItemOverlay>
	);
};

export default ShowingModal;
