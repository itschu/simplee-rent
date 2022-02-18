import { useRouter } from "next/router";
import { Wrap } from "./style";
import {
	Select,
	Option,
	Label,
	InputSeparator,
	Input,
} from "../account/PropSect/style";
import { useState, useRef } from "react";
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

const BookShowing = ({ info }) => {
	const router = useRouter();
	let { email } = router.query;

	const [value, setValue] = useState();
	const mm = useRef(null);
	const today = new Date();
	const [brokenLink, setBrokenLink] = useState(info.length ? true : false);

	const availableDates = info[0].date.map((el) => {
		let good = new Date(el);
		const selectedDate = new Date(el);
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		if (selectedDate < now) {
			console.log("Selected date is in the past");
		} else {
			return good;
		}
	});

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

	// console.log();
	return (
		<Wrap link={brokenLink}>
			<form>
				{brokenLink && (
					<>
						<div className="duration">
							<InputSeparator>
								<Label>Name *</Label>
								<Input type={"text"} required={true} />
								<br /> <br />
								<Label>Email *</Label>
								<Input type={"email"} required={true} />
							</InputSeparator>
							<Label>Duration *</Label>
							<Select
								onChange={(e) => {}}
								value={""}
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
								<TimePicker>
									<GoUp>
										<div>
											<Image src={arrow} alt="" />
										</div>
									</GoUp>
									<div className="timeConainer">
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
										<Time onClick={(e) => {}}>time</Time>
									</div>
									<GoDown>
										<div>
											<Image src={arrow} alt="" />
										</div>
									</GoDown>
								</TimePicker>
							</TimePickerWrapper>
						</div>
					</>
				)}

				{brokenLink || (
					<>
						<h2>This link is invalid!!</h2>
						<p>
							Sorry it appears that this link is <b>broken</b> or{" "}
							<b>expired</b> please contact <b>{email}</b>.
						</p>
					</>
				)}
			</form>
		</Wrap>
	);
};

export default BookShowing;
